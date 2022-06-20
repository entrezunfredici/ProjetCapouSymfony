#include <stdio.h>
#include <esp_log.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include "sdkconfig.h"
#include <Arduino.h>

#include <CApp.h>

extern "C" void app_main(){
    //Initialize Arduino libraries before doing anything
    initArduino();

    CApp* pApp = new CApp();
    pApp->Run();
}