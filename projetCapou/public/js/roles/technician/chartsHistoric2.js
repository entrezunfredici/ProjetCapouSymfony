//datas
const chFloorTemperature={};
const chFloorHumidity={};
const chAirTemperature={};
const chAirHumidity={};
const data={};
//Date Intervall
const DateIntervall={};
sChartDateIntervall=[" "," "];
label=["1","2","3","4","5","6","7"];
DayMode=1;
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

scale=["1","2","3","4","5","6","7"];

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
    }).draw()
    canvas = document.getElementById('TemperatureHistoricDatas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF'; 
    ctx.fillRect(0, 0, 500, 400);
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

function ChartsUpdateChart(oData){
    SortDataList(oData);
    i=0;
    ift=0;
    iat=0;
    ifh=0;
    iah=0;
    oData.forEach(function(){
        if(oData[i].measureType=="temperature_sol"){
            floorTemperatureHistoric[ift]=oData[i].valMeasure;
            //chFloorTemperature[ift]=oData[i];
            ift++;
        }
        if(oData[i].measureType=="temperature_air"){
            airTemperatureHistoric[iat]=oData[i].valMeasure;
            //chAirTemperature[iat]=oData[i];
            iat++;
        }
        if(oData[i].measureType=="taux_humidite_sol"){
            floorHumidityHistoric[ifh]=oData[i].valMeasure;
            //chFloorHumidity[ifh]=oData[i];
            ifh++;
        }
        if(oData[i].measureType=="taux_humidite_air"){
            airHumidityHistoric[iah]=oData[i].valMeasure;
            //chAirHumidity[iah]=oData[i];
            iah++;
        }
        i++;
    })
    //floorTemperatureHistoric=chartsSortDataWithScale(chFloorTemperature, scale);
}

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
    if(scaleValue=="Day"){
        sChartDateIntervall=TGDayDateRange();
        label=['0h','4h','8h','12h','16h','20h','24h'];
        DayMode=1;
    }else if(scaleValue=="Week"){
        sChartDateIntervall=TGWeekDateRange(TGGetIntTableDate(),scale);
        label=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
        DayMode=0;
    }else if(scaleValue=="Mounth"){
        sChartDateIntervall=TGMounthDateRange(TGGetIntTableDate(),scale);
        switch(TGGetThisMounthSize()){
            case 28:
                label=['0','5','9','14','19','23','28'];
                break;
            case 30:
                label=['0','5','10','15','20','25','30'];
                break;
            case 31:
                label=['0','5','10','16','21','26','31'];
                break;
            default:
                break;
        }
        DayMode=0;
    }else if(scaleValue=="Year"){
        sChartDateIntervall=TGYearDateRange(TGGetIntTableDate(),scale);
        label=['Nov-Déc','Jan-Fév','Mars-Avril','Mai-Juin','Juil-Aout','Sept-Oct','Nov-Déc'];
        DayMode=0;
    }
    document.getElementById("MinimumDate").innerHTML =  sChartDateIntervall[0];
    document.getElementById("MaximumDate").innerHTML =  sChartDateIntervall[1];
    ChartsAjaxCallFunction();
    return sChartDateIntervall; 
}

function chartsSortDataWithScale(oDatas, sScales){ // c'est pété
    i=0;
    iDatas=[0,0,0,0,0,0,0];
    for(k=0; k<7; k++){
        while(oDatas[i]!=null){
            x=1;
            if(TGDateCompare(oDatas[i].measureDate, sScales[k], sScales[k+1])){
                iDatas[k]=(iDatas[k]+oDatas[i].valMeasure)/x;
                x++;
            }
            i++;        
        }
    }
    return iDatas;
}


scaleSelect.addEventListener('change', scaleChange);
scaleChange();
function ChartsGetLabels(){
    return label;
}
function SortDataList(dataTable){
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
            }else if((dataTable[k].measureTime>dataTable[k+1].measureTime) && (dataTable[k].measureDate==dataTable[k+1].measureDate)){
                sort=dataTable[k]
                dataTable[k]=dataTable[k+1];
                dataTable[k+1]=sort;
            }else n++;
            if(dataTableLen){
                if(dataTable[dataTableLen].measureDate<dataTable[dataTableLen-1].measureDate){
                    sort=dataTable[dataTableLen-1];
                    dataTable[dataTableLen-1]=dataTable[dataTableLen];
                    dataTable[dataTableLen]=sort;
                }else if((dataTable[dataTableLen].measureTime<dataTable[dataTableLen-1].measureTime) && (dataTable[dataTableLen].measureDate<dataTable[dataTableLen-1].measureDate)){
                    sort=dataTable[dataTableLen-1];
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
        if(s==5000){
            alert("SortError");
            return dataTable;
        }
        s++;
    }
}