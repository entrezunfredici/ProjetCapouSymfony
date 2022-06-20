#include <stdio.h>
#include <esp_log.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include "sdkconfig.h"
#include <Arduino.h>
#include <macros.h>

enum e_RelayStatus{
    RELAY_ALL_CLEARED = 0x0,
    RELAY_VALVE_ON    = 0x1,
    RELAY_1_ON        = 0x2,
    RELAY_2_ON        = 0x4
};

class CRelayControl{
private:
    uint8_t         m_uStatus;

    int             m_iBoostPin;
    int             m_i9VPin,  m_iInvertPin;
    int             m_iRelay1Pin, m_iRelay2Pin;
    
    CRelayControl();
public:
    CRelayControl(int iBoostPin, int i9VPin, int iInvertPin, int iRelay1Pin, int iRelay2Pin);
    ~CRelayControl();

    void StartValve();
    void StopValve();
    
    void ToggleRelay1();
    void ToggleRelay2();

    int GetRelay1State();
    int GetRelay2State();
    int GetValveState();
};