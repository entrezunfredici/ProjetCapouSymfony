#include <Arduino.h>

#include <SPI.h>
#include <WiFi.h>
#include <esp_log.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <LoRa.h>
#include <vector>
#include <string.h>
#include <sstream>
#include <ArduinoHttpClient.h>
#include <map>

#include <macros.h>

#include <BoardConfig.h>

enum e_Status{
    ST_ALL_CLEARED               = 0x0,
    ST_LORA_TX_CALLBACK          = 0x1,
    ST_LORA_RX_CALLBACK          = 0x2,
    ST_LORA_IS_TX                = 0x4,
    ST_MQTT_CALLBACK             = 0x8,
    ST_WIFI_IS_CONNECTED         = 0x10,
    ST_SPI_INITIALIZED           = 0x20,
    ST_HTTP_GET_DONE             = 0x40,
    ST_HTTP_READY_TO_POST_DATA   = 0x80,
    ST_HTTP_READY_TO_POST_RCPT   = 0x100
};

class CLoRaGateway{
private:
    SPIClass*                   m_pSPI;
    LoRaClass*                  m_pLoRa;
    WiFiClass*                  m_pWiFi;
    WiFiClient*                 m_pWiFiClient;
    HttpClient*                 m_pHttpClient;

    char*                       m_strFmtOutput; //Used solely for the I2C screen
    uint8_t                     m_bLocAddr;
    
    static uint16_t             c_status;
    char*                       m_strHttpGetResponse;
    uint8_t                     m_bSenderAddress;
    char*                       m_strSerializedData;
    char*                       m_strSerializedRcpt;

    std::map<uint8_t, std::string>             m_mapCurValveState;

    void _StartClients();
    void _SetLocID();
    void _InitializeSPI();
    void _SetTxMode();
    void _SetRxMode();
    std::string SerializeDataToJson(uint8_t uiAddr, const char* strPayload);
    std::string SerializeReceiptToJson(uint8_t uiAddr, const char* strPayload);

public:
    CLoRaGateway();
    ~CLoRaGateway();

    void SPI_Loop();
    int WiFi_SendData();
    int WiFi_GetData();
    void WiFiReconnect();

    void SendLoRaMessage(uint8_t uiDestAddr, const char* strMessage);

    const char* GetLatestMessageFormatted();
    u8_t        GetReadyToSendStatus();

    static void LoRaRxCallback(int packetSize);
    static void LoRaTxCallback();

};