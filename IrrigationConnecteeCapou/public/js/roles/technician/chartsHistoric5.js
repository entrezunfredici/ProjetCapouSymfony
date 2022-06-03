//datas
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
    }).on('measures', function(obj)
    {
        document.getElementById("dataset").value =  obj.canvas.__measures_snap_dataset__;
        document.getElementById("point").value =  obj.canvas.__measures_snap_point__;
    }).draw()
    canvas = document.getElementById('TemperatureHistoricDatas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF'; //Nuance de bleu
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
    iData=SortDataList(data);
    for(k=0; k<6; k++){
        i=0;
        ift=0;
        iat=0;
        ifh=0;
        iah=0;
        airTemperatureSum=0;
        floorTemperatureSum=0;
        floorHumiditySum=0;
        airHumiditySum=0;
        iData.forEach(function(){
                if(!DayMode){
                    if(TGDateCompare(iData[i].measureDate, scale[k], scale[k+1])){
                        if(iData[i].measureType=="temperature_sol"){
                            floorTemperatureSum+=iData[i].valMeasure;
                            ift++;
                        }
                        if(iData[i].measureType=="temperature_air"){
                            airTemperatureSum+=iData[i].valMeasure;
                            iat++;
                        }
                        if(iData[i].measureType=="taux_humidite_sol"){
                            floorHumiditySum+=iData[i].valMeasure;
                            ifh++;
                        }
                        if(iData[i].measureType=="taux_humidite_air"){
                            airHumiditySum+=iData[i].valMeasure;
                            iah++;
                        }
                    }
                }else{
                    if(iData[i].measureType=="temperature_sol"){
                        floorTemperatureHistoric[iat]=iData[i].valMeasure;
                        ift++;
                    }
                    if(iData[i].measureType=="temperature_air"){
                        airTemperatureHistoric[iat]=iData[i].valMeasure;
                        iat++;
                    }
                    if(iData[i].measureType=="taux_humidite_sol"){
                        floorHumidityHistoric[ifh]=iData[i].valMeasure;
                        ifh++;
                    }
                    if(iData[i].measureType=="taux_humidite_air"){
                        airHumidityHistoric[iah]=iData[i].valMeasure;
                        iah++;
                    }
                }
                console.log(iData[i].valMeasure);
                i++;
            }
        )
        if(iat==0)iat=1
        if(ift==0)iat=1
        if(iah==0)iat=1
        if(ifh==0)iat=1
        if(!DayMode)airTemperatureHistoric[k]=0;
        if(!DayMode)floorTemperatureHistoric[k]=0;
        if(!DayMode)airHumidityHistoric[k]=0;
        if(!DayMode)floorHumidityHistoric[k]=0;
    }
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
    if(scaleValue=="Day"){
        sChartDateIntervall=[TGGetDate(),TGGetDate()];
        label=['0h','4h','8h','12h','16h','20h','24h'];
        DayMode=1;
    }else if(scaleValue=="Week"){
        sChartDateIntervall=TGWeekDateRange(TGGetIntTableDate(),scale);
        label=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
        DayMode=0;
    }else if(scaleValue=="Mounth"){
        sChartDateIntervall=TGMounthDateRange(TGGetIntTableDate(),scale);
        switch(TGGetMounthSize()){
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
            }else n++;
            if(dataTableLen){
                if(dataTable[dataTableLen].measureDate<dataTable[dataTableLen-1].measureDate){
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
        if(s==500){
            return dataTable;
        }
        s++;
    }
}