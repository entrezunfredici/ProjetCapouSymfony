from flask import Flask, make_response, request, render_template
from datetime import datetime
from os import path, mkdir
import json

dictESPLatest = {}
listValveState = []

dictValveStates = {
    "node_id": ["0x56", "0x8D", "0x75"], 
    "state": [False, True, False]
}

def main():
    if path.exists("RequestsLog/") == False:
        mkdir("RequestsLog/")
    
    app = Flask(__name__)

    # The route where the ESP32 gets the state of the valves and posts receipts (when the node has successfully activated a valve/relay)
    @app.route("/bdd/valveState/", methods=['GET', 'POST'])
    def displayValveState():
        if request.method == 'GET':
            global dictValveStates
            res = make_response()
            res.content_type = "application/json"
            res.data = json.dumps(dictValveStates)
            print(f"Data: {res.data}")
            return res

        elif request.method == 'POST':
            global listValveState
            data = request.get_json()
            listValveState.append(data)
            print(f"\033[92mReceived Receipt - {data}\033[0m")
            return "yes"

    # The route where the ESP32 makes POST requests
    @app.route("/bdd/receiveData/", methods=['POST'])
    def getStats():
        global dictESPLatest
        dictESPLatest = request.get_json()
        strFilename = "RequestsLog/Request_" + dictESPLatest["node_id"] + "_" + datetime.now().strftime("%Y_%m_%d-%H:%M:%S") + ".json"
        with open(strFilename, 'w') as f:
            json.dump(dictESPLatest, f, indent=2)

        return "yes"

    # Main page that displays the latest POST data
    @app.route("/", methods=['GET'])
    def showStats():
        global dictESPLatest
        global listValveState

        if(len(dictESPLatest)==0):
            return render_template('indexEmpty.html')

        else:
            return render_template(
            "index.html",
            node_id=dictESPLatest["node_id"],
            latitude=dictESPLatest["latitude"],
            longitude=dictESPLatest["longitude"],
            external_temperature=dictESPLatest["external_temperature"],
            external_humidity=dictESPLatest["external_humidity"],
            internal_temperature=dictESPLatest["internal_temperature"],
            internal_humidity=dictESPLatest["internal_humidity"],
            battery_voltage=dictESPLatest["battery_voltage"],
            valveStates=listValveState
        )
    
    app.run(host="0.0.0.0", port="8000", use_reloader=True)

if __name__ == "__main__":
    main()
