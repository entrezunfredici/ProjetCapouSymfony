//temperature °C
temperatureMax=70
temperatureMin=-30
temperature=0
//humidity %
humidityMin=0
humidityMax=100
humidity=0

function TDShowMeasurements() {
    temperature=document.getElementById("TemperatureValue").innerHTML;
    humidity=document.getElementById("HumidityValue").innerHTML;
    //thermometer
    new RGraph.Thermometer({
        id:    'Temperature',
        min:   temperatureMin,
        max:   temperatureMax,
        value: temperature
    }).draw();
    //manometer
    new RGraph.Gauge({
        id:    'Humidity',
        min:   humidityMin,
        max:   humidityMax,
        value: humidity 
    }).draw();
}
setInterval(TDShowMeasurements, 1000)

//vannes
function TDIrrigation(idButton, buttonColor1, buttonColor2){
    if(ConfirmChangement("êtes ou sur(e) de vouloir modifier l'état de la vanne?")){
        mode=DDChangeBaliseClass(idButton, buttonColor1, buttonColor2);
        if(mode==1){
            //irrigation off
        }else if(mode==2){
            //irrigation on
        }
    }
}