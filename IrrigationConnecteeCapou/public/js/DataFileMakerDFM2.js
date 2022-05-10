const allData={};
const allDonee={};
function DFMGetDate(){
    return new Date().getFullYear()+"_"+new Date().getMonth()+"_"+new Date().getDay()+"_"+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds();
}
function DFMDownloadTxtDataFile(){
    let name="donnees du_"+DFMGetDate();
    i=0;
    let Results="Données:\n"
    while(allDonee[i]!=null){
        Results=Results+"-Donnée "+i+": "+allDonee[i]+";\n";
        i++;
    }
    DFMCreateTextFile(Results, name, "txt")
}
function DFMDownloadXlsxDataFile(){
    let name="donnees du_"+DFMGetDate();
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

function UpdateValues(tdata){
	i=0;
	tdata.forEach(function(){
		console.log(tdata[i].valMeasure);
            allDonee[i]=tdata[i].valMeasure;
            i++;
		}
	)
};

var $j = jQuery.noConflict();

function DFMAjaxCallFunction(){
    $j.get(
		'/technician/charts',	//url
		allData,		        //data
		UpdateValues,	        //success
		'json',		            //dataType
	)
}

DFMAjaxCallFunction();
var idInter = setInterval(DFMAjaxCallFunction, 10000);//Set Interval 3s Between Each Call