#include "CLoRaGateway.h"

#define SERV_IP         "10.100.0.52"
#define SERV_PORT       (8000)

#define ROUTE_SEND      "/bdd/receiveData/"
#define ROUTE_RECV      "/bdd/valveState/"
#define CONTENT_TYPE    "application/json"

uint16_t                                    CLoRaGateway::c_status = ST_ALL_CLEARED;


CLoRaGateway::CLoRaGateway():
    m_pSPI(&SPI),
    m_pLoRa(&LoRa),
    m_pWiFi(&WiFi),
    m_pWiFiClient(nullptr),
    m_bLocAddr(0x00),
    m_bSenderAddress(0)
{
    if(mIsBitsClr(c_status, ST_SPI_INITIALIZED))
        _InitializeSPI();

    _SetLocID();

    m_strFmtOutput = new char[512];
    strncpy(m_strFmtOutput, "", 512);

    m_strHttpGetResponse = new char[512];
    strncpy(m_strHttpGetResponse, "", 512);

    m_strSerializedData = new char[512];
    strncpy(m_strSerializedData, "", 512);

    m_strSerializedRcpt = new char[256];
    strncpy(m_strSerializedRcpt, "", 256);

}

CLoRaGateway::~CLoRaGateway(){
    delete[] m_strSerializedRcpt;
    delete[] m_strSerializedData;
    delete[] m_strHttpGetResponse;
    delete[] m_strFmtOutput;
}

void CLoRaGateway::SPI_Loop(){
    const char* strTag = "CLoRaGateway::SPI_Loop()";
    if(mIsBitsSet(c_status, ST_LORA_TX_CALLBACK)){
        _SetRxMode();
        mBitsClr(c_status, ST_LORA_TX_CALLBACK);
    }

    if(mIsBitsSet(c_status, ST_LORA_RX_CALLBACK)){
        ESP_LOGI(strTag, "Received LoRa message! RSSI:%d\tSNR:%f", m_pLoRa->packetRssi(), m_pLoRa->packetSnr());
        uint8_t bReceiverAddr = m_pLoRa->read();
        if(bReceiverAddr!=m_bLocAddr && bReceiverAddr!=0xFF){
            ESP_LOGI(strTag, "A message was received but it's not for me");
            mBitsClr(c_status, ST_LORA_RX_CALLBACK);
            return;
        }
        
        uint8_t bSenderAddr = m_pLoRa->read();
        uint8_t bSzMessage = m_pLoRa->read();
        
        char strMessage[bSzMessage+1];

        for(int k=0; k<bSzMessage; k++){
            strMessage[k] = (char)m_pLoRa->read();
        }

        strMessage[bSzMessage] = 0;
        ESP_LOGI(strTag, "Raw message content: %s", strMessage);

        snprintf(m_strFmtOutput, 512, "Sender: 0x%X\nmsgLen: %d\nstrMsg: %s\n", bSenderAddr, bSzMessage, strMessage);

        m_bSenderAddress = bSenderAddr;
        if(strMessage[0]=='X'){
            strncpy(m_strSerializedRcpt, SerializeReceiptToJson(bSenderAddr, strMessage).c_str(), 256);
            mBitsSet(c_status, ST_HTTP_READY_TO_POST_RCPT);
        }
        else{
            strncpy(m_strSerializedData, SerializeDataToJson(bSenderAddr, strMessage).c_str(), 512);
            mBitsSet(c_status, ST_HTTP_READY_TO_POST_DATA); 
        }
        
        mBitsClr(c_status, ST_LORA_RX_CALLBACK);
    }

    if(mIsBitsSet(c_status, ST_HTTP_GET_DONE)){
        std::map<uint8_t, std::string> mapNewValveState;

        ESP_LOGI(strTag, "Received new HTTP Message!");
        ESP_LOGI(strTag, "Raw JSON: %s", m_strHttpGetResponse);

        StaticJsonDocument<2048> docSecond;
        deserializeJson(docSecond, m_strHttpGetResponse);

        JsonArray node_ids = docSecond["node_id"].as<JsonArray>();
        JsonArray payloads = docSecond["state"].as<JsonArray>();

        int k=0;
        for(std::string id : node_ids){
            uint8_t uiDestID = (uint8_t)strtol(id.c_str(), NULL, 16);
            std::string strPayload = payloads[k];
            if(!strPayload.compare("true"))
                mapNewValveState.emplace(uiDestID, "on");
            else
                mapNewValveState.emplace(uiDestID, "off");
            k++;
        }


        if(mapNewValveState!=m_mapCurValveState){
            for(auto it=mapNewValveState.begin(); it!=mapNewValveState.end(); ++it){
                if((it->second)!=m_mapCurValveState[it->first]){
                    SendLoRaMessage(it->first, it->second.c_str());
                    ESP_LOGI(strTag, "Target microcontroller ID: 0x%X", it->first);
                    vTaskDelay(100);
                    while(mIsBitsClr(c_status, ST_LORA_TX_CALLBACK));
                }
            }
            m_mapCurValveState = mapNewValveState;
        }
        else
            ESP_LOGI(strTag, "Valve state is the same, not updating");

        docSecond.clear();

        mBitsClr(c_status, ST_HTTP_GET_DONE);
    }
}

int CLoRaGateway::WiFi_SendData(){
    const char* strTag = "CLoRaGateway:WiFi_SendData()";

    int iHttpStatusCode = 0;
    String strResponse = "";

    if(mIsBitsSet(c_status, ST_HTTP_READY_TO_POST_DATA)){
        ESP_LOGI(strTag, "Sending JSON data through HTTP - Content %s\n", m_strSerializedData);
        m_pHttpClient->post(ROUTE_SEND, CONTENT_TYPE, m_strSerializedData);
        iHttpStatusCode = m_pHttpClient->responseStatusCode();
        if(iHttpStatusCode!=200)
            ESP_LOGW(strTag, "Y'a un soucis là chef, HTTP Code: %d", iHttpStatusCode);
            strResponse = m_pHttpClient->responseBody();
            mBitsClr(c_status, ST_HTTP_READY_TO_POST_DATA);
    }
    
    if(mIsBitsSet(c_status, ST_HTTP_READY_TO_POST_RCPT)){
        ESP_LOGI(strTag, "Sending JSON receipt through HTTP to %s:%d%s - Content %s\n", SERV_IP, SERV_PORT, ROUTE_RECV, m_strSerializedRcpt);
        m_pHttpClient->post(ROUTE_RECV, CONTENT_TYPE, m_strSerializedRcpt);
        iHttpStatusCode = m_pHttpClient->responseStatusCode();
        if(iHttpStatusCode!=200)
            ESP_LOGW(strTag, "Y'a un soucis là chef, HTTP Code: %d", iHttpStatusCode);
        strResponse = m_pHttpClient->responseBody();
        mBitsClr(c_status, ST_HTTP_READY_TO_POST_RCPT);
    }

    if(!m_pHttpClient->connected())
        mBitsClr(c_status, ST_WIFI_IS_CONNECTED);

    ESP_LOGI(strTag, "Going through function");
    return mIsBitsSet(c_status, ST_WIFI_IS_CONNECTED);
}

int CLoRaGateway::WiFi_GetData(){
    
    if(!m_pWiFiClient)
        _StartClients();

    const char* strTag = "CLoRaGateway::WiFi_GetData()";
    String strResponse = "";
    int iHttpStatusCode = 0;

    ESP_LOGI(strTag, "Polling data from site");
    m_pHttpClient->get(ROUTE_RECV);

    iHttpStatusCode = m_pHttpClient->responseStatusCode();
    if(iHttpStatusCode!=200)
        ESP_LOGW(strTag, "Y'a un soucis là chef, HTTP Code: %d", iHttpStatusCode);

    strResponse = m_pHttpClient->responseBody();
    strncpy(m_strHttpGetResponse, strResponse.c_str(), 512);
    ESP_LOGI(strTag, "Response: %s", strResponse.c_str());

    mBitsSet(c_status, ST_HTTP_GET_DONE);

    if(!m_pHttpClient->connected())
        mBitsClr(c_status, ST_WIFI_IS_CONNECTED);

    return mIsBitsSet(c_status, ST_WIFI_IS_CONNECTED);
}

void CLoRaGateway::LoRaRxCallback(int packetSize){
    if(packetSize!=0)
        mBitsSet(c_status, ST_LORA_RX_CALLBACK);
}

void CLoRaGateway::LoRaTxCallback(){
    mBitsSet(c_status, ST_LORA_TX_CALLBACK);
}

void CLoRaGateway::_InitializeSPI(){
    const char* strTag = "CLoRaGateway::_InitalizeSPI()";

    ESP_LOGI(strTag, "Initializing SPI..");
    m_pSPI->begin(SPI_PIN_CLK, SPI_PIN_MISO, SPI_PIN_MOSI);

    ESP_LOGI(strTag, "LoRa setSPI()");
    m_pLoRa->setSPI(*m_pSPI);

    ESP_LOGI(strTag, "LoRa setPins()");
    m_pLoRa->setPins(LORA_PIN_CS, LORA_PIN_RST, LORA_PIN_DIO);
    
    if(!m_pLoRa->begin(LORA_FREQ)){
        ESP_LOGE(strTag, "LoRa failed to initialize, entering infinite loop");
        for(;;);
    }    
    else
        ESP_LOGI(strTag, "LoRa initialized");

    m_pLoRa->setSpreadingFactor(LORA_SPREADFACTOR);
    m_pLoRa->setSignalBandwidth(LORA_BANDWITHFREQ);
    m_pLoRa->setCodingRate4(LORA_CODINGRATE);

    m_pLoRa->onReceive(LoRaRxCallback);
    m_pLoRa->onTxDone(LoRaTxCallback);
    m_pLoRa->enableCrc();

    _SetRxMode();
    mBitsSet(c_status, ST_SPI_INITIALIZED);
}

void CLoRaGateway::_StartClients(){
    const char* strTag = "CLoRaGateway::_StartClients()";

    ESP_LOGI(strTag, "Connecting to HTTP Server: %s:%d", SERV_IP, SERV_PORT);
    m_pWiFiClient = new WiFiClient;
    m_pHttpClient = new HttpClient((*m_pWiFiClient), SERV_IP, SERV_PORT);

    mBitsSet(c_status, ST_WIFI_IS_CONNECTED);
}

void CLoRaGateway::_SetLocID(){
    uint8_t bMacAddr[6];
    esp_efuse_mac_get_custom(bMacAddr);
    
    m_bLocAddr = bMacAddr[4];
    ESP_LOGI("CLoRaGateway::_SetLocID()", "ESP32 \"UID\" : 0x%X", m_bLocAddr);
}

void CLoRaGateway::SendLoRaMessage(uint8_t uiDestAddr, const char* strMessage){
    if(mIsBitsClr(c_status, ST_SPI_INITIALIZED))
        return;
    
    _SetTxMode();
    ESP_LOGI("CLoRaGateway::SendLoRaMessage()", "Sending message to 0x%.2X, content: %s", uiDestAddr, strMessage);
    m_pLoRa->beginPacket();
        m_pLoRa->write(uiDestAddr);
        m_pLoRa->write(m_bLocAddr);
        m_pLoRa->write((uint8_t)strnlen(strMessage, 250));
        for(int k=0; k<strnlen(strMessage, 250); k++)
            m_pLoRa->write(strMessage[k]);
        m_pLoRa->write(0);
    m_pLoRa->endPacket(true);
}

void CLoRaGateway::_SetRxMode(){
    ESP_LOGI("CLoRaGateway::_SetRxMode()", "Setting Rx Mode");
    m_pLoRa->disableInvertIQ();
    m_pLoRa->receive();
    mBitsClr(c_status, ST_LORA_IS_TX);
}

void CLoRaGateway::_SetTxMode(){
    if(mIsBitsSet(c_status, ST_LORA_IS_TX))
        return;
    
    ESP_LOGI("CLoRaGateway::_SetTxMode()", "Setting Tx Mode");
    m_pLoRa->idle();
    m_pLoRa->enableInvertIQ();
    mBitsSet(c_status, ST_LORA_IS_TX);
}

u8_t        CLoRaGateway::GetReadyToSendStatus(){return (mIsBitsSet(c_status, ST_HTTP_READY_TO_POST_DATA)|mIsBitsSet(c_status, ST_HTTP_READY_TO_POST_RCPT));}

const char* CLoRaGateway::GetLatestMessageFormatted(){
    return m_strFmtOutput;
}

std::string CLoRaGateway::SerializeDataToJson(uint8_t uiAddr, const char* strPayload){
    
    const char* strTag = "CLoRaGateway::SerializeDataToJson()";
    ESP_LOGI(strTag, "Running function");

    StaticJsonDocument<1024> docFirst;
    char strAddr[8];
    snprintf(strAddr, 8, "0x%.2X", uiAddr);

    std::istringstream iss{strPayload};
    std::vector<std::string> vecTokens{};
    std::string strCache;

    std::vector<std::string> vecKeys{"node_id", "latitude", "longitude", "external_humidity", "internal_humidity", "external_temperature", "internal_temperature", "battery_voltage"};

    int iPos = 0;
    docFirst[vecKeys[iPos]] = strAddr;
    iPos++;

    while(getline(iss, strCache, ' ')){
        vecTokens.push_back(strCache);
        const char* strBuffer = (*vecTokens.rbegin()).c_str();
        docFirst[vecKeys[iPos]] = atof(strBuffer);
        iPos++;
    }

    std::string strSerialized;
    serializeJson(docFirst, strSerialized);

    return strSerialized;
}

std::string CLoRaGateway::SerializeReceiptToJson(uint8_t uiAddr, const char* strPayload){
    StaticJsonDocument<512> docThird;
    char strAddr[8];
    snprintf(strAddr, 8, "0x%.2X", uiAddr);
    const char* strTag = "CLoRaGateway::SerializeReceiptToJson()";

    docThird["node_id"] = strAddr;
    docThird["valve_state"] = (const char*)(strPayload+1);

    ESP_LOGI(strTag, "valve_state = %s", (const char*)(strPayload+1));
    std::string strSerialized;
    serializeJson(docThird, strSerialized);

    ESP_LOGI(strTag, "JSON to send: %s",  strSerialized.c_str());
    return strSerialized;
}

void CLoRaGateway::WiFiReconnect(){
    const char* strTag = "CLoRaGateway::WiFiReconnect()";

    if(mIsBitsSet(c_status, ST_WIFI_IS_CONNECTED))
        return;

    m_pHttpClient->stop();
    ESP_LOGE(strTag, "WiFi has dropped, trying to reconnect");
    m_pWiFiClient->stop();

    ESP_LOGW(strTag, "Awaiting WiFi reconnection");
    m_pWiFi->reconnect();
    while(!m_pWiFi->isConnected());

    ESP_LOGW(strTag, "Awaiting Website Reconnection");
    if(!m_pHttpClient->connected())
        m_pHttpClient->connect(SERV_IP, SERV_PORT);
    while(!m_pHttpClient->connected());
    
    ESP_LOGI(strTag, "Reconnection complete!");
    mBitsSet(c_status, ST_WIFI_IS_CONNECTED);
}