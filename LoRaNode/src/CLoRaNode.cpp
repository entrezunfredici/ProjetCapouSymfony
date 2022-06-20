#include <CLoRaNode.h>

uint8_t CLoRaNode::c_status = ST_NODE_ALL_CLEARED;

CLoRaNode::CLoRaNode():
    m_pLoRa(&LoRa),
    m_pSPI(&SPI),
    m_bLocAddr(0x00),
    m_bMasterAddr(0x00),
    m_strLatestMsg("")
{
    m_pLoRa->onReceive(LoRaReceiveCallback);
    m_pLoRa->onTxDone(LoRaTxDoneCallback);
    m_pLoRa->enableCrc();

    _SetAddress();
    _SetRxMode();
}

CLoRaNode::~CLoRaNode(){}

void CLoRaNode::Loop(){
    const char* strTag = "CLoRaNode::Loop()";
    
    if(mIsBitsSet(c_status, ST_LORA_TX_CALLBACK)){        
        _SetRxMode();
        mBitsClr(c_status, ST_LORA_TX_CALLBACK);
    }

    if(mIsBitsSet(c_status, ST_LORA_RX_CALLBACK)){
        ESP_LOGI(strTag, "RSSI: %d\t SNR:%f", LoRa.packetRssi(), LoRa.packetSnr());
        uint8_t bReceiverAddr = m_pLoRa->read();
        if(bReceiverAddr!=m_bLocAddr && bReceiverAddr!=LORA_BROADCAST_ADDR){
            ESP_LOGW(strTag, "Received a message but it was not for me.");
            mBitsClr(c_status, ST_LORA_RX_CALLBACK);
            return;
        }

        ESP_LOGI(strTag, "Receiver Address: 0x%X", bReceiverAddr);
        
        uint8_t bSenderAddr = m_pLoRa->read();
        ESP_LOGI(strTag, "Sender Address: 0x%X", bSenderAddr);

        if(bReceiverAddr==LORA_BROADCAST_ADDR && bReceiverAddr!=m_bMasterAddr){
            m_bMasterAddr=bSenderAddr;
            ESP_LOGI(strTag, "Received Master Address: 0x%X", m_bMasterAddr);
        }
        
        uint8_t bSzPayload = m_pLoRa->read();
        ESP_LOGI(strTag, "Message Size: %d", bSzPayload);

        char strPayload[bSzPayload+1] = "";
        for(int k=0; k<bSzPayload; k++){
            strPayload[k] = m_pLoRa->read();
        }

        strPayload[bSzPayload] = 0;
        ESP_LOGI(strTag, "Message content: %s", strPayload);

        m_strLatestMsg.clear();
        m_strLatestMsg = strPayload;

        mBitsClr(c_status, ST_LORA_RX_CALLBACK);
    }
}

void CLoRaNode::LoRaReceiveCallback(int packetSize){
    mBitsSet(c_status, ST_LORA_RX_CALLBACK);
}

void CLoRaNode::LoRaTxDoneCallback(){
    mBitsSet(c_status, ST_LORA_TX_CALLBACK);
}

void CLoRaNode::_SetRxMode(){
    ESP_LOGI("CLoRaNode::_SetRxMode()", "Setting Rx Mode");
    m_pLoRa->enableInvertIQ();
    m_pLoRa->receive();
    
    mBitsClr(c_status, ST_LORA_IS_TX);
}

void CLoRaNode::_SetTxMode(){
    if(mIsBitsSet(c_status, ST_LORA_IS_TX))
        return;
    ESP_LOGI("CLoRaNode::_SetTxMode()", "Setting Tx Mode");
    m_pLoRa->idle();
    m_pLoRa->disableInvertIQ();
    
    mBitsSet(c_status, ST_LORA_IS_TX);
}

void CLoRaNode::_SetAddress(){
    uint8_t macAddr[6];
    esp_base_mac_addr_get(macAddr);
    m_bLocAddr = macAddr[4];
    ESP_LOGI("CLoRaNode::_SetAddress()", "Local MAC Address: %.2x:%.2x:%.2x:%.2x:%.2x:%.2x", macAddr[0],macAddr[1],macAddr[2],macAddr[3],macAddr[4],macAddr[5]);
    ESP_LOGI("CLoRaNode::_SetAddress()", "Local LoRa Address: 0x%X", m_bLocAddr);
}

void CLoRaNode::SendMessage(const char* strPayload){
    const char* strTag = "CLoRaNode::SendMessage()";
    if(!m_bMasterAddr){
        ESP_LOGW(strTag, "No master yet, not sending messages.");
        return;
    }

    _SetTxMode();
    uint8_t bSzPayload = (uint8_t)strnlen(strPayload, 250);

    ESP_LOGI(strTag, "Sending message to master 0x%X of length %d", m_bMasterAddr, bSzPayload);
    m_pLoRa->beginPacket();
        m_pLoRa->write(m_bMasterAddr);
        m_pLoRa->write(m_bLocAddr);
        m_pLoRa->write(bSzPayload);
        for(int k=0; k<bSzPayload; k++){
            m_pLoRa->write((uint8_t)strPayload[k]);
        }
        m_pLoRa->write(0);
    m_pLoRa->endPacket(true);
}

std::string CLoRaNode::GetLatestMessage(){
    std::string strMsg = m_strLatestMsg;
    m_strLatestMsg = "";
    return strMsg;
}


uint8_t CLoRaNode::GetLoRaMaster(){return m_bMasterAddr;}

