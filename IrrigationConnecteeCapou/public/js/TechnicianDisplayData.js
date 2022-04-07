//temperature °C
temperatureMax=70
temperatureMin=-30
airTemperature=0
floorTemperature=0
//humidity %
humidityMin=0
humidityMax=100
airHumidity=0
floorHumidity=0

function TDShowMeasurements() {
    document.getElementById("AirHumidityValue").innerHTML=airHumidity;
    document.getElementById("FloorHumidityValue").innerHTML=floorHumidity
    document.getElementById("AirTemperatureValue").innerHTML=airTemperature;
    document.getElementById("FloorTemperatureValue").innerHTML=floorTemperature;
    //thermometers
    new RGraph.Thermometer({
        id:    'AirTemperature',
        min:   temperatureMin,
        max:   temperatureMax,
        value: airTemperature
    }).draw();
    new RGraph.Thermometer({
        id:    'FloorTemperature',
        min:   temperatureMin,
        max:   temperatureMax,
        value: floorTemperature
    }).draw();
    //manometer
    new RGraph.Gauge({
        id:    'AirHumidity',
        min:   humidityMin,
        max:   humidityMax,
        value: airHumidity 
    }).draw();
    new RGraph.Gauge({
        id:    'FloorHumidity',
        min:   humidityMin,
        max:   humidityMax,
        value: floorHumidity 
    }).draw();
}
setInterval(TDShowMeasurements, 250)

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

AjaxCallFunction();
var idInter = setInterval(AjaxCallFunction, 10000);//Set Interval 3s Between Each Call

function UpdateChart(data){
	i=0;
	data.forEach(function(){
		console.log(data[i].valMeasure);
            airHumidity=data[i].valMeasure;
		}
	)

    data.forEach(function(){
		console.log(data[i].valMeasure);
            airTemperature=data[i].valMeasure;
		}
	)
};

var $j = jQuery.noConflict();

function AjaxCallFunction(){
	$j.get(
		'/technician/charts',	//url
		airHumidity,		    //data
		UpdateChart,	        //success
		'json',		            //dataType
	)
}