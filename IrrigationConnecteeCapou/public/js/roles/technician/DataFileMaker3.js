const dfmFloorTemperature={};
const dfmAirTemperature={};
const dfmFloorHumidity={};
const dfmAirHumidity={};
const allData={};
function DFMDownloadTxtDataFile(){
    alert(TGGetDateWithTime());
    let name="donnees du_"+TGGetDateWithTime();
    i=0;
    let Results="Temperatures sol: "
    while(dfmFloorTemperature[i]!=null){
        Results=Results+"-Temperature"+i+": "+dfmFloorTemperature[i]+"°C; ";
        i++;
    }
    i=0;
    Results=Results+"\n Temperatures air: "
    while(dfmAirTemperature[i]!=null){
        Results=Results+"-Temperature"+i+": "+dfmAirTemperature[i]+"°C; ";
        i++;
    }
    i=0;
    Results=Results+"\n Humiditée Sol: "
    while(dfmFloorHumidity[i]!=null){
        Results=Results+"-Humiditée"+i+": "+dfmFloorHumidity[i]+"%; ";
        i++;
    }
    i=0;
    Results=Results+"\n Huimitée air: "
    while(dfmAirHumidity[i]!=null){
        Results=Results+"-Humiditée air:"+i+": "+dfmAirHumidity[i]+"%; ";
        i++;
    }
    DFMCreateTextFile(Results, name, "txt")
}
function DFMDownloadXlsxDataFile(){
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
    var datas = ['Mesure' , 'Valeur'];
    while(data[i]!=null){
        var data=[i, data[i]];
        var datas = datas,data;
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

function DFMUpdateValues(tdata){
	i=0;
    iFt=0;
    iAt=0;
    iFh=0;
    iAh=0;
	tdata.forEach(function(){
        if(tdata[i].measureType=="temperature_sol"){
            dfmFloorTemperature[iFt]=tdata[i].valMeasure;
            iFt++;
        }
        if(tdata[i].measureType=="temperature_air"){
            dfmAirTemperature[iAt]=tdata[i].valMeasure;
            iAt++;
        }
        if(tdata[i].measureType=="taux_humidite_sol"){
            dfmFloorHumidity[iFh]=tdata[i].valMeasure;
            iFh++;
        }
        if(tdata[i].measureType=="taux_humidite_air"){
            dfmAirHumidity[iAh]=tdata[i].valMeasure;
            iAh++;
        }
		console.log(tdata[i].valMeasure);
            i++;
		}
	)
};

var $j = jQuery.noConflict();

function DFMAjaxCallFunction(){
    $j.get(
		'/technician/charts',	//url
		allData,		        //data
		DFMUpdateValues,	    //success
		'json',		            //dataType
	)
}

DFMAjaxCallFunction();
var idInter = setInterval(DFMAjaxCallFunction, 10000);//Set Interval 3s Between Each Call