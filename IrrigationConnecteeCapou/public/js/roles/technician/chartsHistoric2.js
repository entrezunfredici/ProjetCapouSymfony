//datas
const data={};

//Date Intervall
const DateIntervall={};
MinimumDate="****-**-**";
MaximumDate="****-**-**";
ActualDate="****-**-**";

//time
const TimeIntervall={};
MinimumTime="**:**:**";
MaximumTime="**:**:**";
ActualTime="**:**:**";

//Temperatures
temperatureMax=70;
temperatureMin=-30;
airTemperatureHistoric=[0,0,0,0,0,0,0];
floorTemperatureHistoric=[0,0,0,0,0,0,0];

//humidity
humidityMin=0;
humidityMax=100;
airHumidityHistoric=[0,0,0,0,0,0,0];
floorHumidityHistoric=[0,0,0,0,0,0,0];

function ChartsShowMeasurements() {
    ActualDate=TGGetDate();
    ActualTime=TGGetTime();
    var line=new RGraph.Line({
        id: 'HumidityHistoricDatas',
        data: [
            airHumidityHistoric,
            floorHumidityHistoric
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
            measures: {
                self: true,
                snap: true
            }
        }
    }).on('measures', function(obj)
    {
        document.getElementById("dataset").value =  obj.canvas.__measures_snap_dataset__;
        document.getElementById("point").value =  obj.canvas.__measures_snap_point__;
    }).draw()
    var line=new RGraph.Line({
        id: 'TemperatureHistoricDatas',
        data: [
            airTemperatureHistoric,
            floorTemperatureHistoric
            ],
        options: {
            ymax: temperatureMax,
            xmax: 168,
            labels: ChartsGetLabels(),
            xaxispos: 'center',
            gutter: {
                bottom: 45
            },
            margin: 5,
            linewidth: 3,
            shadow: true,
            measures: {
                self: true,
                snap: true
            }
        }
    }).on('measures', function(obj)
    {
        document.getElementById("dataset").value =  obj.canvas.__measures_snap_dataset__;
        document.getElementById("point").value =  obj.canvas.__measures_snap_point__;
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
	data.forEach(
        function(){
            if(data[i].measureType=="temperature_sol"){
                floorTemperatureHistoric[iFt]=data[i].valMeasure;
                iFt++;
            }
            if(data[i].measureType=="temperature_air"){
                airTemperatureHistoric[iAt]=data[i].valMeasure;
                iAt++;
            }
            if(data[i].measureType=="taux_humidite_sol"){
                floorHumidityHistoric[iFh]=data[i].valMeasure;
                iFh++;
                
            }
            if(data[i].measureType=="taux_humidite_air"){
                airHumidityHistoric[iAh]=data[i].valMeasure;
                iAh++;
            }
            i++;
		}
	)
};

var $j = jQuery.noConflict();

function ChartsAjaxCallFunction(){
    airTemperatureHistoric=[0,0,0,0,0,0,0];
    floorTemperatureHistoric=[0,0,0,0,0,0,0];
    airHumidityHistoric=[0,0,0,0,0,0,0];
    floorHumidityHistoric=[0,0,0,0,0,0,0];
    $j.get(
		'/technician/charts',	//url
		data,		            //data
		ChartsUpdateChart,	    //success
		'json',		            //dataType
	)
    alert(TGGetDateWithTime());
    //TGGetLabel('time-scale-select');
}


const scaleSelect = document.getElementById('time-scale-select');
/*function onChange() {
    const scaleValiue = scaleSelect.value;
    range=0;
    if(scaleValue=="Day"){
        
    }else if(scaleValue=="Week"){

    }else if(scaleValue=="Mounth"){

    }else if(scaleValue=="Year"){

    }
}
select.addEventListener('change', onChange);
onChange();*/

ChartsAjaxCallFunction();
var idInter = setInterval(ChartsAjaxCallFunction, 10000);

function ChartsGetLabels(){
    chartsLabels=['T-6','T-5','T-4','T-3','T-2','T-1','T']
    return chartsLabels;
}