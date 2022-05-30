//getters
//getter return string 
function TGGetDate(){
    return new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear();
}

function TGGetTime(){
    return new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
}

function TGGetDateWithTime(){
    return TGGetDate()+"/"+TGGetTime();
}

function TGGetDay(){
    var j = new Array( "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" );
    return j[new Date().getDay() - 1];
}
//getters return int tables
function TGGetIntTableDate(){
    return [new Date().getDate(), (new Date().getMonth()+1), new Date().getFullYear()];
}
function TGGetIntTableTime(){
    return [new Date().getHours(), (new Date().getMinutes()+1), new Date().getSeconds()];
}
function TGGetMounthSize(){
    if((new Date().getMonth()+1)==2)return 28;
    alert(((new Date().getMonth()+1)%2));
    if(((new Date().getMonth()+1)%2)==0)return 30;
    return 31;
}
//range calculators
function TGWeekDateRange(iDateParameter){
    iDay=new Date().getDay() - 1;
    iDate=TGGetIntTableDate();
    if((iDate[0]=iDate[0]-iDay)<=0){
        switch(iDate[1]){
            case 1:
                iDate[0]+=31;
                iDate[1]=12, 
                iDate[2]--;
            case 2:
                iDate[0]+=28;
                iDate[1]=1;
            default:
                if((iDate[1]%2)==0){
                    iDate[0]+=31;
                    iDate[1]--;
                }else{
                    iDate[0]+=30;
                    iDate[1]--;
                }
        }
    }
    //while((iDate[0]>iDateParameter[0]) && (iDate[1]>=iDateParameter[1]) && (iDate[2]>=iDateParameter[2])
    return [TGCreateDateInStrFormat(iDate[0], iDate[1], iDate[2]), TGCreateDateInStrFormat((iDate[0]+6), (new Date().getMonth()+1), (new Date().getFullYear()))];
}
function TGMounthDateRange(iDate){
    if((iDate[1]<1))iDate[1]=1;
    if(iDate[1]==2){
        iDate[0]=28;
    }else{
        if((iDate[1]%2)==0){
            iDate[0]=30;
        }else{
            iDate[0]=31;
        }
    }
    return [TGCreateDateInStrFormat(0, iDate[1], iDate[2]), TGCreateDateInStrFormat(iDate[0], iDate[1], iDate[2])];
}
function TGYearDateRange(iDate){
    return [TGCreateDateInStrFormat(0, 0, iDate[2]), TGCreateDateInStrFormat(31, 12, iDate[2])];
}
function TGDayTimeRange(){
    return [TGCreateDateInStrFormat(0, 0, 0), TGCreateDateInStrFormat(23, 59, 59)];
}

//date comparator
function TGCompare(iInstantToCompare, iInstantMinReference, iInstantMaxReference){
    iDate=TGGetIntTableDate();
    for(k=0; iDate[k]; k++){
        if(iDateReference[k]>iDate[k]){
            alert("Date de référence invalide");
            return 0;
        }
        if(iDateReference[k]<iDate[k])k=3;
    }
    for(k=0; iDate[k]; k++){
        if(iDateToCompare[k]>iDate[k]){
            alert("Date à comparer invalide");
            return 0;
        }
        if(iDateToCompare[k]<iDate[k])k=3;
    }
    for(k=0; k<3; k++){
        if(iDateToCompare[k]>iDateReference[k])return 1;
        if(iDateToCompare[k]<iDateReference[k])return 0;
    }
    for(k=0; k<3; k++){
        if(iTimeReference[k]>iTime[k]){
            alert("Heure de référence invalide");
            return 0;
        }
        if(iTimeReference[k]<iTime[k])k=3;
    }
    for(k=0; iTimeToCompare[k]; k++){
        if(iTimeToCompare[k]>iTime[k]){
            alert("Heure à comparer invalide");
            return 0;
        }
        if(iTimeToCompare[k]<iTime[k])k=3;
    }
    for(k=0; iTimeToCompare[k]; k++){
        if(iTimeToCompare[k]>iTimeReference[k])return 1;
        if(iTimeToCompare[k]<iTimeReference[k])return 0;
    }
    return 1;
}

//
function TGSetDateInterval(sDateMinimum, sDateMaximum){
    //convert time in int variables
    iDateMin=TGConvertDateToInt(sDateMinimum)
    iDate=TGConvertDateToInt(sDate)
    iDateMax=TGConvertDateToInt(sDateMaximum)
    for(k=0; iDate[k]; k++){
        if(iDateMax[k]>iDate[k])iDateMax=iDate;
        if(iDateMax[k]<iDate[k])k=3;
    }
    interval=[0,0,0];
    for(k=0; iDateMax[k]; k++){
        interval[k]=iDateMax[k]-iDateMin[k];
    }
    return interval;
}

function TGCreateTimeInStrFormat(iHours, iMinutes, iSeconds){
    return iHours+":"+iMinutes+":"+iSeconds;
}

function TGCreateDateInStrFormat(iDay, iMounth, iYears){
    return iDay+"-"+iMounth+"-"+iYears;
}

function TGConvertTimeToInt(sTime){
    return TGConvertStrFormatToIntFormat(sTime, ":");
}
function TGConvertDateToInt(sDate){
    return TGConvertStrFormatToIntFormat(sDate, "-");
}

function TGConvertStrFormatToIntFormat(sTime, sSeparator){//dont work
    if(TGStrLen(sSeparator)==0)return 0;
    mode=0;
    sTimeTransit=["","",""];
    iTime=[0,0,0];
    for(k=0; k<TGStrLen(sTime); k++){
        if(sTime[k]==sSeparator){
            mode++;
            n=0;
        }else{
            alert(sTime[k]);
        }
    }
    for(k=0; k<3; k++){
        alert(sTimeTransit[k]);
        iTime[k]=Number(sTimeTransit[k])
    }
    return iTime;
}

function TGStrLen(sText){
    k=0;
    while(sText[k]){
        k++;
    }
    return k;
}