#include <CApp.h>

#define HAS_DISPLAY     (0)
#define MESSAGE_DELAY   (6000)

CApp::CApp():
    m_pI2C(&Wire),
    m_pSerialGPS(&Serial1),
    m_pOneWire(nullptr),
    m_pNMEA(nullptr),
    m_pLoRaNode(nullptr),
    m_pSHT(nullptr),
    m_pDisplay(nullptr),
    m_fInHum(0.0f),
    m_uStatus(ST_TASK_ALL_CLEARED),
    m_fBatV(0.0f)
{

    const char* strTag = "CApp::CApp()";
    /*
    Setting the custom MAC address as the default
    (the MAC address used is a random one burnt on EFUSE1)
    */

    ESP_LOGI(strTag, "Loading MAC Address from EFUSE");
    uint8_t macAddress[6];
    esp_efuse_mac_get_custom(macAddress);
    esp_base_mac_addr_set(macAddress);

    // Initializing SPI libraries
    _InitSPI();

    // Initializing I2C Communication

    ESP_LOGI(strTag, "Initializing I2C Communications");
    m_pI2C->begin(I2C_SDA, I2C_SCL);

    // Initializing Serial communication with the GPS

    ESP_LOGI(strTag, "Initializing GPS Serial communications");
    m_pSerialGPS->begin(9600, SERIAL_8N1, GPS_TX, GPS_RX);

    // Initializing OneWire communication

    ESP_LOGI(strTag, "Initializing OneWire for DS18B20 sensor");
    m_pOneWire = new OneWire(CAPTMP_PIN);

    // Initializing the various objects used in our application

    ESP_LOGI(strTag, "Initializing various objects");
    m_pLoRaNode = new CLoRaNode;
    m_pNMEA = new TinyGPSPlus;
    m_pSHT = new SHT20;
    m_pDS = new DS18B20(m_pOneWire);
    m_pPMU = new AXP20X_Class;
    m_pRelayControl = new CRelayControl(BOOST_9V_PIN, ENABLE_9V_PIN, INVERT_9V_PIN, RELAY1_PIN, RELAY2_PIN);

    pinMode(LED_ACT, OUTPUT);
    pinMode(38, INPUT);
}

CApp::~CApp(){
    //These objects are created in our CApp objects
    delete m_pDisplay;
    delete m_pDS;
    delete m_pSHT;
    delete m_pLoRaNode;

    //These objects are pointers to previously initialized objects
    m_pSerialGPS = nullptr;
    m_pI2C = nullptr;
}

void CApp::Run(){
    const char* strTag = "CApp::Run()";
    ESP_LOGI(strTag, "Initializing all FreeRTOS Task");

    xTaskCreatePinnedToCore(&LoRaLoopTask, "Node_Loop", 2048, (void*)this, 5, NULL, 0);
    xTaskCreatePinnedToCore(&SensorTask, "Node_Sensor", 2048, (void*)this, 5, nullptr, 1);
    xTaskCreatePinnedToCore(&ValveTask, "Node_Valve", 2048, (void*)this, 5, NULL, 0);
    xTaskCreatePinnedToCore(&I2CTask, "Node_I2C", 2048, (void*)this, 5, NULL, 0);
    xTaskCreatePinnedToCore(&LoRaSendTask, "Node_Msg", 2048, (void*)this, 5, NULL, 0);
}

void CApp::LoRaLoopTask(void* pvParameters){
    CApp* pApp = (CApp*)pvParameters;

    std::string strLatest = "";

    for(;;){
        strLatest = pApp->m_pLoRaNode->GetLatestMessage();
        pApp->m_pLoRaNode->Loop();

        if(!strLatest.compare("on"))
            mBitsSet(pApp->m_uStatus, ST_TASK_SHOULD_START_VALVE);
        else if(!strLatest.compare("off"))
            mBitsSet(pApp->m_uStatus, ST_TASK_SHOULD_STOP_VALVE);
        
        vTaskDelay(50);
    }
    vTaskDelete(nullptr);
}

void CApp::LoRaSendTask(void* pvParameters){
    CApp* pApp = (CApp*)pvParameters;
    char strBuf[128];
    const char* strTag = "CApp::LoRaSendTask()";

    float fInTemp = 0;
    float fCacheTemp = 0;
    for(;;){
        fCacheTemp = pApp->m_pDS->getTempC();
        if((fCacheTemp>-30) && (fCacheTemp<45))
            fInTemp = fCacheTemp;
        if(!mIsBitsSet(pApp->m_uStatus, ST_TASK_POLLING_SENSORS)){
            snprintf(
                strBuf,
                128,
                "%f %f %.2f %.2f %.2f %.2f %.2f",
                pApp->m_pNMEA->location.lat(),
                pApp->m_pNMEA->location.lng(),
                pApp->m_pSHT->getHumidity(),
                pApp->m_fInHum,
                pApp->m_pSHT->getTemperature(),
                fInTemp,
                pApp->m_fBatV
            );

            ESP_LOGI(strTag, "Raw data to send: %s", strBuf);
            pApp->m_pLoRaNode->SendMessage(strBuf);
            vTaskDelay(MESSAGE_DELAY);
        }
        vTaskDelay(50);

    }
    vTaskDelete(nullptr);
}

void CApp::SensorTask(void* pvParameters){
    CApp* pApp = (CApp*)pvParameters;

    const char* strTag = "CApp::SensorTag()";

    ESP_LOGI(strTag, "Starting Analog Humidity Pin");
    pinMode(CAPHUM_PIN, INPUT);

    ESP_LOGI(strTag, "Starting DS18B20");
    pApp->m_pDS->begin();

    for(;;){
        mBitsSet(pApp->m_uStatus, ST_TASK_POLLING_SENSORS);
        while(pApp->m_pSerialGPS->available()>0){
            pApp->m_pNMEA->encode(pApp->m_pSerialGPS->read());
        }
        pApp->m_fInHum = 4096.0f-analogRead(CAPHUM_PIN);
        pApp->m_fInHum = map(pApp->m_fInHum, 430, 3800, 0, 100);

        //Air value : 460
        //Dry soil value: 530
        //Water value: 3500

        pApp->m_pDS->requestTemperatures();

        mBitsClr(pApp->m_uStatus, ST_TASK_POLLING_SENSORS);
        if (millis() > 5000 && pApp->m_pNMEA->charsProcessed() < 10) {
            ESP_LOGE(strTag, "No GPS detected: check wiring.");
            while (true);
        }
        vTaskDelay(1000);
    }
    vTaskDelete(nullptr);
}

void CApp::I2CTask(void* pvParameters){
    CApp* pApp = (CApp*)pvParameters;

    const char* strTag = "CApp::I2CTask()";
    ESP_LOGI(strTag, "Starting SHT20 object");
    pApp->DisplayInit();
    pApp->m_pSHT->begin(I2C_SDA, I2C_SCL);
    pApp->m_pPMU->begin(*pApp->m_pI2C, AXP192_SLAVE_ADDRESS);

    for(;;){
        pApp->m_pSHT->read();
        pApp->m_fBatV = pApp->m_pPMU->getBattVoltage()/1000;
        
        pApp->DisplayPrintInfo();
        vTaskDelay(500);
    }

    vTaskDelete(nullptr);
}

#ifdef _IS_VALVE
void CApp::ValveTask(void* pvParameters){
    CApp* pApp = (CApp*)pvParameters;

    const char* strTag = "CApp::ValveTask()";
    pinMode(LED_ACT, OUTPUT);

    for(;;){
        if(mIsBitsSet(pApp->m_uStatus, ST_TASK_SHOULD_START_VALVE)){
            if(!pApp->m_pRelayControl->GetValveState()){     
                ESP_LOGI(strTag, "Starting Valve using CRelayControl object");
                pApp->m_pRelayControl->StartValve();
                digitalWrite(LED_ACT, HIGH);
                vTaskDelay(500);
                pApp->m_pLoRaNode->SendMessage("Xon");

                mBitsClr(pApp->m_uStatus, ST_TASK_SHOULD_START_VALVE);
                mBitsClr(pApp->m_uStatus, ST_TASK_SHOULD_STOP_VALVE);
                
            }
        }

        else if(mIsBitsSet(pApp->m_uStatus, ST_TASK_SHOULD_STOP_VALVE)){
            if(pApp->m_pRelayControl->GetValveState()){
                ESP_LOGI(strTag, "Stopping Valve using CRelayControl object");
                pApp->m_pRelayControl->StopValve();
                digitalWrite(LED_ACT, LOW);
                vTaskDelay(500);
                pApp->m_pLoRaNode->SendMessage("Xoff");
                
                mBitsClr(pApp->m_uStatus, ST_TASK_SHOULD_START_VALVE);
                mBitsClr(pApp->m_uStatus, ST_TASK_SHOULD_STOP_VALVE);
            }
        }

        vTaskDelay(500);
    }
    vTaskDelete(nullptr);
}
#else //_IS_VALVE
void CApp::ValveTask(void* pvParameters){
    CApp* pApp = (CApp*)pvParameters;

    const char* strTag = "CApp::ValveTask()";
    pinMode(LED_ACT, OUTPUT);

    for(;;){
        if(mIsBitsSet(pApp->m_uStatus, ST_TASK_SHOULD_START_VALVE)){
            if(!pApp->m_pRelayControl->GetRelay1State()){     
                ESP_LOGI(strTag, "Starting Relay1 using CRelayControl object");
                pApp->m_pRelayControl->ToggleRelay1();
                digitalWrite(LED_ACT, HIGH);
                vTaskDelay(500);
                pApp->m_pLoRaNode->SendMessage("Xon");

                mBitsClr(pApp->m_uStatus, ST_TASK_SHOULD_START_VALVE);
                mBitsClr(pApp->m_uStatus, ST_TASK_SHOULD_STOP_VALVE);
                
            }
        }

        else if(mIsBitsSet(pApp->m_uStatus, ST_TASK_SHOULD_STOP_VALVE)){
            if(pApp->m_pRelayControl->GetRelay1State()){
                ESP_LOGI(strTag, "Stopping Relay1 using CRelayControl object");
                pApp->m_pRelayControl->ToggleRelay1();
                digitalWrite(LED_ACT, LOW);
                vTaskDelay(500);
                pApp->m_pLoRaNode->SendMessage("Xoff");
                
                mBitsClr(pApp->m_uStatus, ST_TASK_SHOULD_START_VALVE);
                mBitsClr(pApp->m_uStatus, ST_TASK_SHOULD_STOP_VALVE);
            }
        }

        vTaskDelay(500);
    }
    vTaskDelete(nullptr);
}
#endif //_IS_VALVE

void CApp::_InitSPI(){
    SPI.begin(LORA_CLK, LORA_MISO, LORA_MOSI);
    LoRa.setSPI(SPI);
    LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO);

    if(!LoRa.begin(LORA_FREQ)){
        ESP_LOGE("CApp::_InitSPI()", "Couldn't initialize LoRa, entering infinite loop");
        for(;;);
    }
    else
        ESP_LOGI("CApp::_InitSPI()", "LoRa Initialized !");

    LoRa.setSpreadingFactor(LORA_SPREADFACTOR);
    LoRa.setSignalBandwidth(LORA_BANDWITHFREQ);
    LoRa.setCodingRate4(LORA_CODINGRATE);
}

void CApp::DisplayInit(){
    if(!HAS_DISPLAY){
        m_pDisplay = nullptr;
        return;
    }

    ESP_LOGI("CApp::DisplayInit()", "Starting SSD1306 Display");
    m_pDisplay = new Adafruit_SSD1306(128, 64, m_pI2C);

    m_pDisplay->begin(SSD1306_SWITCHCAPVCC, 0x3C, false);
    m_pDisplay->display();

    m_pDisplay->setFont(&Minecraftia_Regular4pt7b);
    m_pDisplay->setTextSize(1);
    m_pDisplay->setTextColor(SSD1306_WHITE);
}

void CApp::DisplayPrintInfo(){
    if(!HAS_DISPLAY)
        return;
    
    static const std::vector<const char*> vecStrings = {
        "ESP32-NODE",
        "Bat: %.2f V",
        "Gwy: 0x%.2X",
        "Node 0x%.2x",
        "Lat: %.4f",
        "Lng: %.4f",
        "iTmp: %.2f",
        "oTmp: %.2f",
        "iHum: %.2f",
        "oHum: %.2f"
    };

    std::vector<double> vecValues = {
        0,
        m_fBatV,
        0,
        0,
        m_pNMEA->location.lat(),
        m_pNMEA->location.lng(),
        m_pDS->getTempC(),
        m_pSHT->getTemperature(),
        m_fInHum,
        m_pSHT->getHumidity()
    };
    
    for(int k=0; k<vecStrings.size(); k++){
        int iVertOffset = 12;

        if(k>1)
            iVertOffset += 4;

        if(!(k%2))
            m_pDisplay->setCursor(0, iVertOffset+(k*6));
        else{
            m_pDisplay->setCursor(64, iVertOffset+(k-1)*6);
        }
        
        switch(k){
        case 2:
            m_pDisplay->printf(vecStrings[k], m_pLoRaNode->GetLoRaMaster());
            break;
        case 3:
            m_pDisplay->printf(vecStrings[k], m_pLoRaNode->GetLocAddr());
            break;
        default:
            m_pDisplay->printf(vecStrings[k], vecValues[k]);
            break;    
        }
    }
    m_pDisplay->display();
}
