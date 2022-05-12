const data={};
//temperature °C
temperatureMax=70
temperatureMin=-30
airTemperature=0
airTemperatureHistoric=[0,0,0,0,0,0,0]
floorTemperature=0
floorTemperatureHistoric=[0,0,0,0,0,0,0]
nbAirTemperature=0
nbFloorTemperature=0
//humidity %
humidityMin=0
humidityMax=100
airHumidity=0
airHumidityHistoric=[0,0,0,0,0,0,0];
floorHumidity=0
floorHumidityHistoric=[0,0,0,0,0,0,0];
nbAirHumidity=0
nbFloorHumidity=0

function ChartsShowMeasurements() {
    document.getElementById("AirHumidityValue").innerHTML=airHumidity;
    document.getElementById("FloorHumidityValue").innerHTML=floorHumidity;
    document.getElementById("AirTemperatureValue").innerHTML=airTemperature;
    document.getElementById("FloorTemperatureValue").innerHTML=floorTemperature;
    document.getElementById("nbAirHumidityValue").innerHTML=nbAirHumidity;
    document.getElementById("nbFloorHumidityValue").innerHTML=nbFloorHumidity;
    document.getElementById("nbAirTemperatureValue").innerHTML=nbAirTemperature;
    document.getElementById("nbFloorTemperatureValue").innerHTML=nbFloorTemperature;
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
    var line=new RGraph.Line({
        id: 'HumidityHistoricDatas',
        data: [
            airHumidityHistoric,
            floorHumidityHistoric,
            ],
        options: {
            ymax: humidityMax,
            xmax: 168,
            labels: ChartsGetLabels(),
            xaxispos: 'center',
            gutter: {
                bottom: 45
            },
            hmargin: 5,
            linewidth: 3,
            shadow: true,
            crosshairs: {
                self: true,
                snap: true
            }
        }
    }).on('crosshairs', function(obj)
    {
        document.getElementById("dataset").value =  obj.canvas.__crosshairs_snap_dataset__;
        document.getElementById("point").value =  obj.canvas.__crosshairs_snap_point__;
    }).draw()
    var line=new RGraph.Line({
        id: 'TemperatureHistoricDatas',
        data: [
            airTemperatureHistoric,
            floorTemperatureHistoric,
            ],
        options: {
            ymax: temperatureMax,
            xmax: 168,
            labels: ChartsGetLabels(),
            xaxispos: 'center',
            gutter: {
                bottom: 45
            },
            hmargin: 5,
            linewidth: 3,
            shadow: true,
            crosshairs: {
                self: true,
                snap: true
            }
        }
    }).on('crosshairs', function(obj)
    {
        document.getElementById("dataset").value =  obj.canvas.__crosshairs_snap_dataset__;
        document.getElementById("point").value =  obj.canvas.__crosshairs_snap_point__;
    }).draw()
}
setInterval(ChartsShowMeasurements, 250)
//vannes
function ChartsIrrigation(idButton, buttonColor1, buttonColor2){
    if(ConfirmChangement("êtes ou sur(e) de vouloir modifier l'état de la vanne?")){
        mode=DDChangeBaliseClass(idButton, buttonColor1, buttonColor2);
        if(mode==1){
            //irrigation off
        }else if(mode==2){
            //irrigation on
        }
    }
}

function ChartsUpdateChart(data){
	i=0;
    iFt=6;
    iAt=6;
    iFh=6;
    iAh=6;
    nbAirHumidity=0;
    nbAirTemperature=0;
    nbFloorHumidity=0;
    ndFloorTemperature=0;
	data.forEach(
        function(){
            if(data[i].measureType=="temperature_sol"){
                floorTemperature=data[i].valMeasure
                floorTemperatureHistoric[iFt]=data[i].valMeasure;
                iFt++;
                floorTemperatureHistoric[0]=data[i].valMeasure;
                ndFloorTemperature++;
            }
            if(data[i].measureType=="temperature_air"){
                airTemperature=data[i].valMeasure;
                airTemperatureHistoric[iAt]=data[i].valMeasure;
                iAt++;
                nbAirTemperature++;
            }
            if(data[i].measureType=="taux_humidite_sol"){
                floorHumidity=data[i].valMeasure;
                floorHumidityHistoric[iFh]=data[i].valMeasure;
                iFh++;
                nbFloorHumidity++;
                
            }
            if(data[i].measureType=="taux_humidite_air"){
                airHumidity=data[i].valMeasure;
                airHumidityHistoric[iAh]=data[i].valMeasure;
                iAh++;
                nbAirHumidity++;
            }
            i++;
		}
	)
};

var $j = jQuery.noConflict();

function ChartsAjaxCallFunction(){
    $j.get(
		'/technician/charts',	//url
		data,		            //data
		ChartsUpdateChart,	    //success
		'json',		            //dataType
	)
}

ChartsAjaxCallFunction();
var idInter = setInterval(ChartsAjaxCallFunction, 10000);

function ChartsGetLabels(){
    chartsLabels=['T-6','T-5','T-4','T-3','T-2','T-1','T']
    return chartsLabels;
}
