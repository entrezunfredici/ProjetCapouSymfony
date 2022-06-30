const dfmFloorTemperature={};
const dfmFloorHumidity={};
const dfmAirTemperature={};
const dfmAirHumidity={};
const allData={};

function DFMDownloadTxtDataFile(){
    DFMAjaxCallFunction();
    let name="donnees telechargees le "+TGGetDateWithTime();
    i=0;
    sDateIntervall=scaleChange();
    let Results="données de "+sDateIntervall[0]+" à "+TGGetDateWithTime()+"\n Temperatures sol: ";
    while(dfmFloorTemperature[i]!=null){
        /*alert(TGCreateDateWithTime(dfmFloorTemperature[i].measureDate, dfmFloorTemperature[i].measureTime));
        alert()*/
        if(TGDateWithTimeCompare(TGCreateDateWithTime(dfmFloorTemperature[i].measureDate, dfmFloorTemperature[i].measureTime), sDateIntervall[0], sDateIntervall[1])){
            Results=Results+"-Temperature "+dfmFloorTemperature[i].measureDate+" à "+dfmAirTemperature[i].measureTime+" : "+dfmFloorTemperature[i].valMeasure+"°C;";
        }
        //if(TGDateCompare(dfmFloorTemperature[i].measureDate, sDateIntervall[0], sDateIntervall[1]))Results=Results+"-Temperature "+dfmFloorTemperature[i].measureDate+" à "+dfmAirTemperature[i].measureTime+" : "+dfmFloorTemperature[i].valMeasure+"°C;";
        i++;
    }
    i=0;
    Results=Results+"\n Temperatures air: "
    while(dfmAirTemperature[i]!=null){
        if(TGDateWithTimeCompare(TGCreateDateWithTime(dfmAirTemperature[i].measureDate, dfmAirTemperature[i].measureTime), sDateIntervall[0], sDateIntervall[1])){
            Results=Results+"-Temperature "+dfmAirTemperature[i].measureDate+" à "+dfmAirTemperature[i].measureTime+" : "+dfmAirTemperature[i].valMeasure+"°C;";
        }
        //if(TGDateCompare(dfmAirTemperature[i].measureDate, sDateIntervall[0], sDateIntervall[1]))Results=Results+"-Temperature "+dfmAirTemperature[i].measureDate+" à "+dfmAirTemperature[i].measureTime+" : "+dfmAirTemperature[i].valMeasure+"°C;";
        i++;
    }
    i=0;
    Results=Results+"\n Humiditée sol: "
    while(dfmFloorHumidity[i]!=null){
        if(TGDateWithTimeCompare(TGCreateDateWithTime(dfmFloorHumidity[i].measureDate, dfmFloorHumidity[i].measureTime), sDateIntervall[0], sDateIntervall[1])){
            Results=Results+"-Humiditée "+dfmFloorHumidity[i].measureDate+" à "+dfmFloorHumidity[i].measureTime+" : "+dfmFloorHumidity[i].valMeasure+"%;";
        }
        //if(TGDateCompare(dfmFloorHumidity[i].measureDate, sDateIntervall[0], sDateIntervall[1]))Results=Results+"-Humiditée "+dfmFloorHumidity[i].measureDate+" à "+dfmFloorHumidity[i].measureTime+" : "+dfmFloorHumidity[i].valMeasure+"%;";
        i++;
    }
    i=0;
    Results=Results+"\n Humiditée air: "
    while(dfmAirHumidity[i]!=null){
        if(TGDateWithTimeCompare(TGCreateDateWithTime(dfmAirHumidity[i].measureDate, dfmAirHumidity[i].measureTime), sDateIntervall[0], sDateIntervall[1])){
            Results=Results+"-Humiditée "+dfmAirHumidity[i].measureDate+" à "+dfmAirHumidity[i].measureTime+" : "+dfmAirHumidity[i].valMeasure+"%;";
        }
        //if(TGDateCompare(dfmAirHumidity[i].measureDate, sDateIntervall[0], sDateIntervall[1]))Results=Results+"-Humiditée "+dfmAirHumidity[i].measureDate+" à "+dfmAirHumidity[i].measureTime+" : "+dfmAirHumidity[i].valMeasure+"%;";
        i++;
    }
    DFMCreateTextFile(Results, name, "txt")
}
function DFMDownloadXlsxDataFile(){
    DFMAjaxCallFunction();
    let name="donnees du_"+TGGetDateWithTime();
    DFMCreateXlsxFile(allData, name)
}

function DFMCreateXlsxFile(data, file_name) {
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Mesures",
        Subject: "Mesures",
        Author: "Red Stapler",
    };    
    wb.SheetNames.push("Test Sheet");
    i=0;
    var datas = ['Temperatures sol',' ','Temperatures air',' ','Humiditée air',' ','Humiditée sol',' ' ];
    //['Dates', 'Mesures', 'Dates', 'Mesures', 'Dates', 'Mesures', 'Dates', 'Mesures']
    i=0;
    sDateIntervall=scaleChange();
    let Results="données de "+sDateIntervall[0]+" à "+sDateIntervall[1]+"\n Temperatures sol: ";
    while(dfmFloorTemperature[i]!=null){
        if(TGDateCompare(dfmFloorTemperature[i].measureDate, sDateIntervall[0], sDateIntervall[1])){
            //[dfmFloorTemperature[i].measureDate, dfmFloorTemperature[i].valMeasure+"°C;";
        }
        i++;
    }
    i=0;
    Results=Results+"\n Temperatures air: "
    while(dfmAirTemperature[i]!=null){
        if(TGDateCompare(dfmAirTemperature[i].measureDate, sDateIntervall[0], sDateIntervall[1])){
            //dfmAirTemperature[i].measureDate+","+dfmAirTemperature[i].valMeasure+"°C;";
        }
        i++;
    }
    i=0;
    Results=Results+"\n Humiditée sol: "
    while(dfmFloorHumidity[i]!=null){
        if(TGDateCompare(dfmFloorHumidity[i].measureDate, sDateIntervall[0], sDateIntervall[1])){
            //"-Humiditée"+dfmFloorHumidity[i].measureDate+": "+dfmFloorHumidity[i].valMeasure+"%;";
        }
        i++;
    }
    i=0;
    Results=Results+"\n Huimitée air: "
    while(dfmAirHumidity[i]!=null){
        if(TGDateCompare(dfmAirHumidity[i].measureDate, sDateIntervall[0], sDateIntervall[1])){
            //"-Humiditée air:"+dfmAirHumidity[i].measureDate+": "+dfmAirHumidity[i].valMeasure+"%;";
        }
        i++;
    }
    var ws_data = [datas];
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = XLSX.utils.aoa_to_sheet(ws_data);
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;       
    }
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), file_name+'.xlsx');
}

function DFMCreateTextFile(data, file_name, file_type) {
    var file = new Blob([data], {type: file_type});
    if (window.navigator.msSaveOrOpenBlob) 
        window.navigator.msSaveOrOpenBlob(file, file_name);
    else { 
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = file_name;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function DFMUpdateValues(data){
	i=0;
    iFt=0;
    iAt=0;
    iFh=0;
    iAh=0;
    SortDataList(data);
	data.forEach(function(){
        sDateIntervall=scaleChange();
        if(data[i].measureType=="temperature_sol"){
            dfmFloorTemperature[iFt]=data[i];
            iFt++;
        }
        if(data[i].measureType=="temperature_air"){
            dfmAirTemperature[iAt]=data[i];
            iAt++;
        }
        if(data[i].measureType=="taux_humidite_sol"){
            dfmFloorHumidity[iFh]=data[i];
            iFh++;
        }
        if(data[i].measureType=="taux_humidite_air"){
            dfmAirHumidity[iAh]=data[i];
            iAh++;
        }
        i++;
	})
};

var $j = jQuery.noConflict();

function DFMAjaxCallFunction(){
    $j.get(
		'/technician/charts',	//url
		'false',		        //data
		DFMUpdateValues,	    //success
		'json',		            //dataType
	)
}

DFMAjaxCallFunction();
setInterval(DFMAjaxCallFunction, 10000);