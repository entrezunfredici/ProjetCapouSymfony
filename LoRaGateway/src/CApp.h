#include <stdio.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include "sdkconfig.h"
#include <Arduino.h>
#include <esp_log.h>

#include "oled/SSD1306Wire.h"

#include <Wire.h>
#include <CLoRaGateway.h>
#include <axp20x.h>

#define WIFI_SSID           "UniFiLayGui"
#define WIFI_PASS           "laygui123"


class CApp{
private:
    WiFiClass*          m_pWiFi;

    CLoRaGateway*       m_pLoRaGateway; //LoRa Gateway object (LoRa -> JSON via MQTT)

    int                 m_iIsConnected;
    
    //FreeRTOS tasks
    static void WiFi_SendTask(void* pvParameters);
    static void WiFi_RecvTask(void* pvParameters);
    static void LoRa_LoopTask(void* pvParameters);

    //AXP20 helper
    int EnablePowerSources();
public:
    CApp();
    ~CApp();
    void Run();
};