#include <CRelayControl.h>

CRelayControl::CRelayControl(int iBoostPin, int i9VPin, int iInvertPin, int iRelay1Pin, int iRelay2Pin):
    m_uStatus(RELAY_ALL_CLEARED),
    m_iBoostPin(iBoostPin),
    m_i9VPin(i9VPin),
    m_iInvertPin(iInvertPin),
    m_iRelay1Pin(iRelay1Pin),
    m_iRelay2Pin(iRelay2Pin)
{
    const char* strTag = "CRelayControl::CRelayControl()";
    pinMode(m_iBoostPin,  OUTPUT);
    pinMode(m_i9VPin,     OUTPUT);
    pinMode(m_iInvertPin, OUTPUT);
    pinMode(m_iRelay1Pin, OUTPUT);
    pinMode(m_iRelay2Pin, OUTPUT);
    
    pinMode(m_iBoostPin,  LOW);
    pinMode(m_i9VPin,     LOW);
    pinMode(m_iInvertPin, LOW);
    pinMode(m_iRelay1Pin, LOW);
    pinMode(m_iRelay2Pin, LOW);

    StopValve();
    ESP_LOGI(strTag, "Created object!");

}

CRelayControl::~CRelayControl(){}

void CRelayControl::StartValve(){

    const char* strTag = "CRelayControl::StartValve()";

    ESP_LOGI(strTag, "Starting Valve...");
	//Boost Converter
    digitalWrite(m_iBoostPin, HIGH);
    digitalWrite(m_iInvertPin, LOW);
    digitalWrite(m_i9VPin, LOW);
    vTaskDelay(100);

	digitalWrite(m_i9VPin, HIGH);
	vTaskDelay(12);
    digitalWrite(m_i9VPin, LOW);

	vTaskDelay(10);
    digitalWrite(m_iBoostPin, 0);

    mBitsSet(m_uStatus, RELAY_VALVE_ON);
    ESP_LOGI(strTag, "Started Valve...");
}

void CRelayControl::StopValve(){

    const char* strTag = "CRelayControl::StopValve()";
    ESP_LOGI(strTag, "Stopping Valve...");

    //Boost Converter
	digitalWrite(m_iBoostPin, HIGH);
	digitalWrite(m_iInvertPin, HIGH);		// pour avoir du -9V
	vTaskDelay(100);

	digitalWrite(m_i9VPin, HIGH);
    vTaskDelay(12);
	digitalWrite(m_i9VPin, LOW);
    vTaskDelay(10);
    digitalWrite(m_iBoostPin, LOW);

    mBitsClr(m_uStatus, RELAY_VALVE_ON);
    ESP_LOGI(strTag, "Stopped Valve...");
}

void CRelayControl::ToggleRelay1(){
    digitalWrite(m_iRelay1Pin, mIsBitsClr(m_uStatus, RELAY_1_ON));
    mBitsTgl(m_uStatus, RELAY_1_ON);
}

void CRelayControl::ToggleRelay2(){
    digitalWrite(m_iRelay2Pin, mIsBitsClr(m_uStatus, RELAY_2_ON));
    mBitsTgl(m_uStatus, RELAY_2_ON);
}

int CRelayControl::GetRelay1State(){return mIsBitsSet(m_uStatus, RELAY_1_ON);}

int CRelayControl::GetRelay2State(){return mIsBitsSet(m_uStatus, RELAY_2_ON);}

int CRelayControl::GetValveState(){return mIsBitsSet(m_uStatus, RELAY_VALVE_ON);}