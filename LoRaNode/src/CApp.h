#include <stdio.h>
#include <esp_log.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include "sdkconfig.h"
#include <Arduino.h>
#include <SPI.h>
#include <LoRa.h>
#include <vector>

#include <TinyGPS++.h>
#include <SHT2x.h>
#include <OneWire.h>
#include <DS18B20.h>
#include <Adafruit_I2CDevice.h>
#include <Adafruit_I2CRegister.h>
#include <Adafruit_SSD1306.h>
#include <CustomFonts/minecraftia.h>
#include <axp20x.h>

#include <CRelayControl.h>
#include <CLoRaNode.h>

#include <BoardConfig.h>
#include <macros.h>

//#define _IS_VALVE

enum e_taskStatus{
    ST_TASK_ALL_CLEARED          = 0x0,
    ST_TASK_POLLING_SENSORS      = 0x1,
    ST_TASK_SHOULD_START_VALVE   = 0x2,
    ST_TASK_SHOULD_STOP_VALVE    = 0x4
};

class CApp{
private:
    TwoWire*                    m_pI2C;       //I2C comm. library
    HardwareSerial*             m_pSerialGPS; //Serial object communicating with GPS
    OneWire*                    m_pOneWire;   //OneWire object used by the DS18B20 sensor object
    TinyGPSPlus*                m_pNMEA;      //NMEA parsing object
    CLoRaNode*                  m_pLoRaNode;  //LoRa Node Object
    SHT20*                      m_pSHT;       //SHT2x sensor object
    DS18B20*                    m_pDS;        //DS18B20 sensor object
    Adafruit_SSD1306*           m_pDisplay;   //SSD1306 object
    float                       m_fInHum;     //Internal humidity readings (from analogRead())
    uint32_t                    m_uStatus;    //Various flags
    AXP20X_Class*               m_pPMU;       //Power management unit (AXP192)
    CRelayControl*              m_pRelayControl;

    float                       m_fBatV;      //Battery Voltage (in Volts)
    //SPI initialization
    void _InitSPI();
    
    //FreeRTOS tasks
    static void LoRaLoopTask(void* pvParameters);   //LoRa receive loop task (sets the LoRa module in receive mode and waits for messages)
    static void LoRaSendTask(void* pvParameters);   //LoRa send task (periodically sends data to the Gateway/Master)
    static void SensorTask(void* pvParameters);     //Sensor task (polls for new non I2C sensors data)
    static void I2CTask(void* pvParameters);        //I2C Task (handles the SSD1306 display and the SHT20 that are both present on the I2C bus)
    static void ValveTask(void* pvParameters);      //Valve Task (Handles when to start and shutdown valves)
    
    //Display Helpers
    void DisplayInit();
    void DisplayPrintInfo();

public:
    CApp();                                         //Object constructor
    ~CApp();                                        //Object destructor
    void Run();                                     //Run function that creates all the FreeRTOS tasks

};
