import serial.tools.list_ports
import subprocess
import os

def main():
    binFolder = f"ESP32-Binaries"
    bootloaderPath = f"{binFolder}/bootloader.bin"
    partitionPath = f"{binFolder}/partitions.bin"
    firmwarePath = f"{binFolder}/firmware.bin"

    listPorts = listSerialPorts()
    print("Ports série disponibles: ")

    for iteration, ports in enumerate(listPorts):
        print(f"{iteration+1}) {ports}")
    
    numberInput = int(input("Choisissez votre port série: "))
    serialPort = listPorts[numberInput-1]
    
    os.system(f"esptool.py --chip esp32 --port {serialPort} --baud 921600 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m --flash_size 4MB 0x1000 {bootloaderPath} 0x8000 {partitionPath} 0x10000 {firmwarePath}")

def listSerialPorts() -> list:
    listPorts = []
    if os.name == 'nt':
        ports = serial.tools.list_ports.comports()
        for port, _, _ in sorted(ports):
            listPorts.append(port)
    else:
        lsCommand = subprocess.run(['ls', '/dev/'], stdout=subprocess.PIPE, text=True)
        for line in lsCommand.stdout.split('\n'):
            if ('ttyACM' in line or 'ttyUSB' in line):
                listPorts.append(f"/dev/{line}")

    return listPorts

        

if __name__ =="__main__":
    main()
