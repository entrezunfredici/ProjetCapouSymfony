//temperature °C
temperatureMax=70
temperatureMin=-30
temperature=0;
//humidity %
humidityMin=0
humidityMax=100
humidity=0

const TemperatureElem = document.getElementById("TemperatureValue")
const HumidityElem = document.getElementById("HumidityValue")
function SetMeasures(setTemperature, setHumidity){
    temperature=setTemperature
    humidity=setHumidity
}

function ShowMeasurements() {
    SetMeasures(Math.random()*(temperatureMax-temperatureMin)+temperatureMin, Math.random()*(humidityMax-humidityMin)+humidityMin)//mesures setter
    //thermometer
    new RGraph.Thermometer({
        id:    'Temperature',
        min:   temperatureMin,
        max:   temperatureMax,
        value: temperature
    }).draw();
    TemperatureElem.innerText = temperature;
    //manometer
    new RGraph.Gauge({
        id:    'Humidity',
        min:   humidityMin,
        max:   humidityMax,
        value: humidity 
    }).draw();
    HumidityElem.innerText = humidity;
}

setInterval(ShowMeasurements, 1000)