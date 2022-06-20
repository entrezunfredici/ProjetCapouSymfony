#include <CApp.h>


#define BROADCAST_INTERVAL  120000
#define GET_TICK_INTERVAL   1300

CApp::CApp():
    m_pWiFi(&WiFi),
    m_pLoRaGateway(nullptr)
{

    if(EnablePowerSources()){
        ESP_LOGE("CApp::CApp()", "Enabling Power Sources has miserably failed. Infinite loop");
        while(1);
    }

    const char* strTag = "CApp::CApp()";
    
    //Reading mac address from efuse
    ESP_LOGI(strTag, "Loading MAC Address from EFUSE");
    uint8_t macAddress[6];
    esp_efuse_mac_get_custom(macAddress);
    esp_base_mac_addr_set(macAddress);

    //Initializing WiFi
    ESP_LOGI(strTag, "Initializing WiFi");
    m_pWiFi->begin(WIFI_SSID, WIFI_PASS);
    while(!m_pWiFi->isConnected());
      
    //Creating LoRaGateway object
    ESP_LOGI(strTag, "Creating LoRaGateway object");
    m_pLoRaGateway = new CLoRaGateway();
}

CApp::~CApp(){

}

void CApp::Run(){
    xTaskCreatePinnedToCore(&LoRa_LoopTask, "lora_loop", 16384, (void*)this, 5, nullptr, 0);
    xTaskCreatePinnedToCore(&WiFi_SendTask, "wifi_sendloop", 16384, (void*)this, 5, nullptr, 1);
    xTaskCreatePinnedToCore(&WiFi_RecvTask, "wifi_recvloop", 8192, (void*)this, 5, nullptr, 1);
}


void CApp::WiFi_SendTask(void* pvParameters){
    CApp* pApp = (CApp*)pvParameters;
    const char* strTag = "CApp::WiFi_SendTask";

    ESP_LOGI(strTag, "Loop started");

    for(;;){
        if(pApp->m_pLoRaGateway->GetReadyToSendStatus())
            pApp->m_pLoRaGateway->WiFi_SendData();
        vTaskDelay(20);
    }

    vTaskDelete(NULL);
}

void CApp::WiFi_RecvTask(void* pvParameters){
    CApp* pApp = (CApp*)pvParameters;
    const char* strTag = "CApp::WiFi_RecvTask";

    ESP_LOGI(strTag, "Loop started");

    for(;;){
        pApp->m_pLoRaGateway->WiFi_GetData();
        vTaskDelay(GET_TICK_INTERVAL);    
    }

    vTaskDelete(NULL);
}

void CApp::LoRa_LoopTask(void* pvParameters){
    CApp* pApp = (CApp*)pvParameters;
    const char* strTag = "CApp::LoRa_LoopTask";

    ESP_LOGI(strTag, "Loop started");

    long lBaseTime = 0;
    long lElapsedTime = millis() - lBaseTime;
    for(;;){
        lElapsedTime = millis() - lBaseTime;
        if(lElapsedTime>BROADCAST_INTERVAL){
            ESP_LOGI(strTag, "Sending broadcast message");
            pApp->m_pLoRaGateway->SendLoRaMessage(0xFF, "I'm my own master now!");
            lBaseTime=millis();
            lElapsedTime=millis()-lBaseTime;
        }
        if((lElapsedTime%BROADCAST_INTERVAL)<200)
            ESP_LOGI(strTag, "BaseTime: %ld \t ElapsedTime: %ld", lBaseTime, lElapsedTime);

        pApp->m_pLoRaGateway->SPI_Loop();
        vTaskDelay(20);  
    }
    vTaskDelete(NULL);
}

int CApp::EnablePowerSources(){
    ESP_LOGI("CApp::EnablePowerSources()", "Enabling power sources through the AXP20x module");
    Wire.begin(21, 22);
    AXP20X_Class PMU;
    if (PMU.begin(Wire, AXP192_SLAVE_ADDRESS) == AXP_FAIL) {
        return 1;
    }
    /*
     * The charging indicator can be turned on or off
     * * * */
    // PMU.setChgLEDMode(LED_BLINK_4HZ);

    /*
    * The default ESP32 power supply has been turned on,
    * no need to set, please do not set it, if it is turned off,
    * it will not be able to program
    *
    *   PMU.setDCDC3Voltage(3300);
    *   PMU.setPowerOutPut(AXP192_DCDC3, AXP202_ON);
    *
    * * * */

    /*
     *   Turn off unused power sources to save power
     * **/

    PMU.setPowerOutPut(AXP192_DCDC1, AXP202_OFF);
    PMU.setPowerOutPut(AXP192_DCDC2, AXP202_OFF);
    PMU.setPowerOutPut(AXP192_LDO2, AXP202_OFF);
    PMU.setPowerOutPut(AXP192_LDO3, AXP202_OFF);
    PMU.setPowerOutPut(AXP192_EXTEN, AXP202_OFF);

    /*
     * Set the power of LoRa and GPS module to 3.3V
     **/
    PMU.setLDO2Voltage(3300);   //LoRa VDD
    PMU.setLDO3Voltage(3300);   //GPS  VDD
    PMU.setDCDC1Voltage(3300);  //3.3V Pin next to 21 and 22 is controlled by DCDC1

    PMU.setPowerOutPut(AXP192_DCDC1, AXP202_OFF);
    PMU.setPowerOutPut(AXP192_LDO2, AXP202_ON);
    PMU.setPowerOutPut(AXP192_LDO3, AXP202_OFF);

    pinMode(PMU_IRQ, INPUT_PULLUP);
    attachInterrupt(PMU_IRQ, [] {
        // pmu_irq = true;
    }, FALLING);

    PMU.adc1Enable(AXP202_VBUS_VOL_ADC1 |
                   AXP202_VBUS_CUR_ADC1 |
                   AXP202_BATT_CUR_ADC1 |
                   AXP202_BATT_VOL_ADC1,
                   AXP202_ON);

    PMU.enableIRQ(AXP202_VBUS_REMOVED_IRQ |
                  AXP202_VBUS_CONNECT_IRQ |
                  AXP202_BATT_REMOVED_IRQ |
                  AXP202_BATT_CONNECT_IRQ,
                  AXP202_ON);
    PMU.clearIRQ();

    return 0;
}