//datas
const data={};
//Date Intervall
const DateIntervall={};
sChartDateIntervall=[" "," "];
label=["1","2","3","4","5","6","7"];

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
    let canvas = document.getElementById('HumidityHistoricDatas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF'; //Nuance de bleu
    ctx.fillRect(0, 0, 500, 400);
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
    canvas = document.getElementById('TemperatureHistoricDatas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF'; //Nuance de bleu
    ctx.fillRect(0, 0, 500, 400);
    if(lineTwo)delete linetwo;
    var lineTwo=new RGraph.Line({
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
    iData=SortDataList(data);
    iData.forEach(
        function(){
            if(iData[i].measureType=="temperature_sol"){
                floorTemperatureHistoric[iFt]=iData[i].valMeasure;
                //data[i].measureDate;
                iFt++;
            }
            if(iData[i].measureType=="temperature_air"){
                airTemperatureHistoric[iAt]=iData[i].valMeasure;
                iAt++;
            }
            if(iData[i].measureType=="taux_humidite_sol"){
                floorHumidityHistoric[iFh]=iData[i].valMeasure;
                iFh++;    
            }
            if(iData[i].measureType=="taux_humidite_air"){
                airHumidityHistoric[iAh]=iData[i].valMeasure;
                iAh++;
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

const scaleSelect = document.getElementById('time-scale-select');
function scaleChange() {
    const scaleValue = scaleSelect.value;
    scaling=0;
    accurancy=0;
    if(scaleValue=="Day"){
        accurancy=24;
        sChartDateIntervall=[TGGetDate(),TGGetDate()];
        label=['0h','4h','8h','12h','16h','20h','24h'];
    }else if(scaleValue=="Week"){
        scaling=7;
        accurancy=14;
        sChartDateIntervall=TGWeekDateRange(TGGetIntTableDate());
        label=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
    }else if(scaleValue=="Mounth"){
        accurancy=24;
        sChartDateIntervall=TGMounthDateRange(TGGetIntTableDate());
        switch(TGGetMounthSize()){
            case 28:
                label=['0','5','9','14','19','23','28'];
            case 30:
                label=['0','5','10','15','20','25','30'];
            case 31:
                label=['0','5','10','16','21','26','31'];
            default:
        }
    }else if(scaleValue=="Year"){
        scaling=12;
        accurancy=24;
        sChartDateIntervall=TGYearDateRange(TGGetIntTableDate());
        label=['Nov-Déc','Jan-Fév','Mars-Avril','Mai-Juin','Juil-Aout','Sept-Oct','Nov-Déc'];
    }
    document.getElementById("MinimumDate").value =  sChartDateIntervall[0];
    document.getElementById("MaximumDate").value =  sChartDateIntervall[1];
}
scaleSelect.addEventListener('change', scaleChange);
scaleChange();
function ChartsGetLabels(){
    return label;
}
function SortDataList(dataTable){//not works
    dataTableLen=0;
    s=0;
    while(1){
        k=0;
        n=0;
        while(dataTable[k+1]){
            if(dataTable[k].measureDate>dataTable[k+1].measureDate){
                sort=dataTable[k]
                dataTable[k]=dataTable[k+1];
                dataTable[k+1]=sort;
            }else n++;
            if(dataTableLen){
                if(dataTable[dataTableLen].measureDate<dataTable[dataTableLen-1].measureDate){
                    sort=dataTable[dataTableLen-1]
                    dataTable[dataTableLen-1]=dataTable[dataTableLen];
                    dataTable[dataTableLen]=sort;
                }
                dataTableLen--;
            }
            k++;
        }
        DataTableLen=k;
        if(n==k){
            return dataTable;
        }
        if(s==500){
            return dataTable;
        }
        s++;
    }
}