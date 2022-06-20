#define LOG_LOCAL_LEVEL ESP_LOG_NONE
#include <stdio.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include "sdkconfig.h"
#include <Arduino.h>

#include <CApp.h>

extern "C" void app_main()
{
    // initialize arduino library before we start tasks
    initArduino();

    CApp* pApp = new CApp();

    pApp->Run();
}