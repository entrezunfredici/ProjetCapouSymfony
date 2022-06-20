//Defining LoRa SPI pins
#define LORA_MOSI   27 // On the PCB, no need to use it
#define LORA_MISO   19
#define LORA_SS     18
#define LORA_DIO    26
#define LORA_CLK    5
#define LORA_RST    14


//Defining I2C and GPS Serial pins
#define I2C_SCL     22 
#define I2C_SDA     21
#define GPS_TX      34  // On the PCB, no need to use them
#define GPS_RX      12

//Define power management unit interrupt pin
#define PMU_IRQ     35

//Defining DS18B20 and Analog capacitive sensor pins
#define CAPTMP_PIN  4  //DS18B20 OneWire
#define CAPHUM_PIN  36  //Analog humidity sensor pin
#define RELAY1_PIN      0  
#define RELAY2_PIN      15
#define INVERT_9V_PIN   25
#define BOOST_9V_PIN    33
#define ENABLE_9V_PIN   32

//Defining LoRa frequency
#define LORA_FREQ   868E6

//Defining activity LED
#define LED_ACT     2
//Defining LoRa params
#define LORA_SPREADFACTOR   (10)
#define LORA_BANDWITHFREQ   (62.5E3)
#define LORA_CODINGRATE     (6)


//Available GPIO pins: 15, 35, 23, 2, 25, 0, 33
