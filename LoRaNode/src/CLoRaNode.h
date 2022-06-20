#include <Arduino.h>
#include <SPI.h>
#include <string>
#include <LoRa.h>

#include <macros.h>

#define LORA_BROADCAST_ADDR (0xFF)

enum e_Status{
    ST_NODE_ALL_CLEARED  = 0x0,
    ST_LORA_TX_CALLBACK = 0x1,
    ST_LORA_RX_CALLBACK = 0x2,
    ST_LORA_IS_TX   = 0x4
};

class CLoRaNode{
private:
    LoRaClass*  m_pLoRa;
    SPIClass*   m_pSPI;
    uint8_t     m_bLocAddr;
    uint8_t     m_bMasterAddr;
    std::string m_strLatestMsg;

    static uint8_t c_status;
public:
    CLoRaNode();
    ~CLoRaNode();
    void Loop();
    void SendMessage(const char* strPayload);
    static void LoRaReceiveCallback(int packetSize);
    static void LoRaTxDoneCallback();
    std::string GetLatestMessage();
    uint8_t     GetLoRaMaster();
    uint8_t     GetLocAddr(){return m_bLocAddr;};

private:
    void _SetRxMode();
    void _SetTxMode();
    void _SetAddress();
};
