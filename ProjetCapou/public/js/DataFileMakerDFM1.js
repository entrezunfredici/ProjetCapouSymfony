const allData={};
const allDonee={};
function DFMDownloadTxtDataFile(){
    let dateYear = new Date().getFullYear();
    let dateMounth = new Date().getMonth();
    let dateDay = new Date().getDay();
    let timeHours = new Date().getHours();
    let timeMinutes = new Date().getMinutes();
    let timeSeconds = new Date().getSeconds();
    let name="donnees du_"+dateDay+"_"+dateMounth+"_"+dateYear+"_a_"+timeHours+"h"+timeMinutes+"_"+timeSeconds;
    i=0;
    let Results="Données:\n"
    while(allDonee[i]!=null){
        Results=Results+"-Donnée "+i+": "+allDonee[i]+";\n";
        i++;
    }
    DFMCreateTextFile(Results, name, "txt")
}
function DFMDownloadXlsxDataFile(){
    let dateYear = new Date().getFullYear();
    let dateMounth = new Date().getMonth();
    let dateDay = new Date().getDay();
    let timeHours = new Date().getHours();
    let timeMinutes = new Date().getMinutes();
    let timeSeconds = new Date().getSeconds();
    let name="donnees du_"+dateDay+"_"+dateMounth+"_"+dateYear+"_a_"+timeHours+"h"+timeMinutes+"_"+timeSeconds;
    i=0;
    DFMCreateXlsxFile(allData, name)
}

function DFMCreateXlsxFile(data, file_name) {
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "Red Stapler",
    };
        
    wb.SheetNames.push("Test Sheet");
    var ws_data = [['Mesure' , 'Valeur']];
    while(data[i]!=null){
        ws_data=ws_data+[[i , data[i]]];
        i++;
    }
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws;

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