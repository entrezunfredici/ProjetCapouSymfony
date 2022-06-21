//temperature °C
temperatureMax=70
temperatureMin=-30
//humidity %
humidityMin=0
humidityMax=100

const TemperatureElem = document.getElementById("TemperatureValue")
const HumidityElem = document.getElementById("HumidityValue")

function MeasurementsRefresh() {
    temperature=Math.random()*(temperatureMax-temperatureMin)+temperatureMin //temperature
    humidity=Math.random()*(humidityMax-humidityMin)+humidityMin //humidity
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

setInterval(MeasurementsRefresh, 1000)