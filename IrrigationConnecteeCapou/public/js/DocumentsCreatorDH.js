const DCData={};
const DCDonee={};
function DCDownloadODSDataFile(){
    let dateYear = new Date().getFullYear();
    let dateMounth = new Date().getMonth();
    let dateDay = new Date().getDay();
    let timeHours = new Date().getHours();
    let timeMinutes = new Date().getMinutes();
    let timeSeconds = new Date().getSeconds();
    let name="donnees du_"+dateDay+"_"+dateMounth+"_"+dateYear+"_a_"+timeHours+"h"+timeMinutes+"_"+timeSeconds;
    i=0;
    let Results="Données:\n"
    while(DCDonee[i]!=null){
        Results=Results+"-Donnée "+i+": "+DCDonee[i]+";\n";
        i++;
    }
    DCdownloadFiles(Results, name, "xml")
}

function DCdownloadFiles(data, file_name, file_type) {
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

function UpdateValues(DCData){
	i=0;
	DCData.forEach(function(){
		console.log(DCData[i].valMeasure);
            DCDonee[i]=DCData[i].valMeasure;
            i++;
		}
	)
};

var $j = jQuery.noConflict();

function DCAjaxCallFunction(){
    $j.get(
		'/technician/charts',	//url
		DCData,		            //data
		UpdateValues,	        //success
		'json',		            //dataType
	)
}

DCAjaxCallFunction();
var idInter = setInterval(DCAjaxCallFunction, 10000);//Set Interval 3s Between Each Call