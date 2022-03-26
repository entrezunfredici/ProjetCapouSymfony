//temperature °C
temperatureMax=70
temperatureMin=-30
temperature=0
//humidity %
humidityMin=0
humidityMax=100
humidity=0

//show mesures
//const TemperatureElem = document.getElementById("TemperatureValue")
//const HumidityElem = document.getElementById("HumidityValue")
function TCSetMeasures(setTemperature, setHumidity){
    temperature=setTemperature
    humidity=setHumidity
}

function TCShowMeasurements() {
    TCSetMeasures(Math.random()*(temperatureMax-temperatureMin)+temperatureMin, Math.random()*(humidityMax-humidityMin)+humidityMin)//mesures setter
    //temperature=document.getElementById("TemperatureValue").value
    //humidity=document.getElementById("HumidityValue").value
    //thermometer
    new RGraph.Thermometer({
        id:    'Temperature',
        min:   temperatureMin,
        max:   temperatureMax,
        value: temperature
    }).draw();
    //TemperatureElem.innerText = temperature;
    //manometer
    new RGraph.Gauge({
        id:    'Humidity',
        min:   humidityMin,
        max:   humidityMax,
        value: humidity 
    }).draw();
    //HumidityElem.innerText = humidity;
}
setInterval(TCShowMeasurements, 1000)

//vannes
function TCIrrigation(idButton, buttonColor1, buttonColor2){
    if(ConfirmChangement("êtes ou sur(e) de vouloir modifier l'état de la vanne?")){
        mode=ChangeBaliseClass(idButton, buttonColor1, buttonColor2);
        if(mode==1){
            //irrigation off
        }else if(mode==2){
            //irrigation on
        }
    }
}