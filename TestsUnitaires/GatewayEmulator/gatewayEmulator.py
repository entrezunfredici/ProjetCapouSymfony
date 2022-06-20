import threading
import requests
from random import randint, random, choice
from datetime import datetime, timedelta
from time import sleep
import json

hosts = ["http://127.0.0.1"]

def createFakeValues() -> dict:
    data = {
        "node_id": "0xAA",
        "latitude": round(randint(43, 44) + random(), 6),
        "longitude":  round(1 + random(), 6),
        "external_temperature": round(randint(15, 35) + random(), 2),
        "external_humidity": round(randint(40, 75) + random(), 2),
        "internal_temperature": round(randint(15, 35) + random(), 2),
        "internal_humidity": round(randint(50, 95) + random(), 2),
        "battery_voltage": choice([3.7, 3.8, 3.9, 4.0, 4.1, 4.2])
    }
    return data

def sendDataToHosts(host: str):
    jsonData = createFakeValues()
    print(f"Raw data to send {jsonData}")
    postReq = requests.post(f"{host}:8000/bdd/receiveData/", headers={"content-type": "application/json"}, data=json.dumps(jsonData, indent=0))

def getValveStateFromHosts(host: str) -> dict:
    hostUrl = f"{host}:8000/bdd/valveState/"
    getReq = requests.get(hostUrl)
    print(f"Got data from {hostUrl}: \n{getReq.json()}\n")
    return getReq.json()

def sendReceiptToHost(data: dict, oldData: dict, host: str):
    headers = {"content-type": "application/json"}
    route = ":8000/bdd/valveState/"

    dataCondensed =     dict(zip(data["node_id"], data["state"]))
    oldDataCondensed =  {}
    
    print(f"Data Condensed: {dataCondensed}")
    if(len(oldDataCondensed)>0):
        oldDataCondensed  = dict(zip(oldData["node_id"], oldData["state"]))

    for key, value in dataCondensed.items():
        if(oldDataCondensed.get(key)==None or value!=oldDataCondensed[key]):
            if(value is True):
                postReq = requests.post(f"{host}{route}", headers=headers, data=json.dumps({"node_id":key, "valve_state":"on"}, indent=0))
                print(f"Sending data to server: {key}:on")
            else:
                postReq = requests.post(f"{host}{route}", headers=headers, data=json.dumps({"node_id":key, "valve_state":"off"}, indent=0)) 
                print(f"Sending data to server: {key}:off")               
            sleep(3)

def pollTask():
    global hosts
    lastTime = datetime.now()
    
    oldData = {}
    data = {}

    while(True):
        currentTime = datetime.now()
        if((currentTime-lastTime)>timedelta(seconds=5)):
            print("\u001b[36m--- Polling data periodically ---")
            for host in hosts:
                oldData = data
                data = getValveStateFromHosts(host)
                sendReceiptToHost(data, oldData, host)
            lastTime = datetime.now()
            print("\u001b[0m")
        sleep(1)

def sendTask():
    global hosts
    lastTime = datetime.now()
    
    while(True):
        currentTime = datetime.now()
        if((currentTime-lastTime)>timedelta(seconds=15)):
            print("\u001b[31m--- Sending data periodically ---")
            for host in hosts:
                sendDataToHosts(host)
            lastTime = datetime.now()
            print("\u001b[0m")
        sleep(1)

def main():
    print("===GATEWAY EMULATOR STARTED===")
    
    pollThread = threading.Thread(target=pollTask)
    sendThread = threading.Thread(target=sendTask)
    
    pollThread.start()
    sendThread.start()

if __name__ == "__main__":
    main()
