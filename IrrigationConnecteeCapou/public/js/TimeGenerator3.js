sTime="00:00:00";
sDate="00-00-0000";
function TGGetDate(){
    return new Date().getDay()+"-"+new Date().getMonth()+"-"+new Date().getFullYear();
}

function TGGetTime(){
    return new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
}

function TGGetDateWithTime(){
    return TGGetDate()+"/"+TGGetTime();
}

function TGGetLabel(idSelector, range, sDateAndTimeMinimum){
    label={}
    if(scaleSelector = document.getElementById(idSelector)){
        scaleselect=scaleSelector.value;
        if(scaleselect=="Day"){
            if(range>24)return; 
            n=24/range;
            itime=TGConvertStrFormatToIntFormat(sTime, ':');
            idate=TGConvertStrFormatToIntFormat(sDate, '-');
            for(k=0; k<range; k++){
                lable[k]=(itime[0]-(k*n));
                if(lable[k]<0){
                    label[k]+=24;
                    idate[0]--;
                }
            }
            sTimeMinimum=TGCreateTimeInStrFormat(label[(range-1)], itime[1], itime[2]);
            sDateMinimum=TGCreateTimeInStrFormat(idate[0], idate[1], idate[2]);
        }else if(scaleselect=="Week"){
            
        }else if(scaleselect=="Mounth"){

        }else if(scaleselect=="Year"){

        }
    }
    sDateAndTimeMinimum[sDateMinimum, sTimeMinimum];
    return label;
}

function TGCompare(sDateToCompare, sDateReference, sTimeToCompare, sTimeReference){
    iDateReference=TGConvertDateToInt(sDateReference)
    iDate=TGConvertDateToInt(sDate)
    iDateToCompare=TGConvertDateToInt(sDateToCompare)
    iTimeReference=TGConvertTimeToInt(sTimeReference)
    iTime=TGConvertTimeToInt(sTime)
    iTimeToCompare=TGConvertTimeToInt(sTimeToCompare)
    for(k=0; k<3; k++){
        if(iDateReference[k]>iDate[k]){
            alert("Date de référence invalide");
            return 0;
        }
        if(iDateReference[k]<iDate[k])k=3;
    }
    for(k=0; k<3; k++){
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
    for(k=0; k<3; k++){
        if(iTimeToCompare[k]>iTime[k]){
            alert("Heure à comparer invalide");
            return 0;
        }
        if(iTimeToCompare[k]<iTime[k])k=3;
    }
    for(k=0; k<3; k++){
        if(iTimeToCompare[k]>iTimeReference[k])return 1;
        if(iTimeToCompare[k]<iTimeReference[k])return 0;
    }
    return 1;
}

function TGSetDateInterval(sDateMinimum, sDateMaximum){
    //convert time in int variables
    iDateMin=TGConvertDateToInt(sDateMinimum)
    iDate=TGConvertDateToInt(sDate)
    iDateMax=TGConvertDateToInt(sDateMaximum)
    for(k=0; k<3; k++){
        if(iDateMax[k]>iDate[k])iDateMax=iDate;
        if(iDateMax[k]<iDate[k])k=3;
    }
    interval=[0,0,0];
    for(k=0; k<3; k++){
        interval[k]=iDateMax[k]-iDateMin[k];
    }
    return interval;
}
function TGSetTimeInterval(sTimeMinimum, sTimeMaximum){
    //convert time in int variables
    iTimeMin=TGConvertTimeToInt(sTimeMinimum)
    iTime=TGConvertTimeToInt(sTime)
    iTimeMax=TGConvertTimeToInt(sTimeMaximum)
    for(k=0; k<3; k++){
        if(iTimeMax[k]>iTime[k])iTimeMax=iTime;
        if(iTimeMax[k]<iTime[k])k=3;
    }
    interval=[0,0,0];
    for(k=0; k<3; k++){
        interval[k]=iTimeMax[k]-iTimeMin[k];
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

function TGConvertStrFormatToIntFormat(sTime, sSeparator){
    if(TGStrLen(sSeparator)==0)return 0;
    mode=0;
    n=0;
    iTime=[0,0,0];
    for(k=0; k<TGStrLen(sTime); k++){
        if(sTime[k]==sSeparator){
            mode++;
            n=0;
        }else{
            iTime[mode]=sTime[k]+iTime[mode]*(10*n)
            n++;
        }
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

function TGCallBackFunction(){
    sTime=TGGetTime();
    sDate=TGGetDate();

}
TGCallBackFunction();
var idInter = setInterval(TGCallBackFunction, 250);