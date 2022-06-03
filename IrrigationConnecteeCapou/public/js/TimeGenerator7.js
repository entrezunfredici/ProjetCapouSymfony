//getters
//getter return string 
function TGGetDate(){
    sMounth="0";
    sDay="0"
    if((iMounth=new Date().getMonth()+1)<10){
        sMounth="0"+iMounth;
    }
    if((iDay=new Date().getDate())<10){
        sDay="0"+iDay
    }
    return new Date().getFullYear()+"-"+sMounth+"-"+sDay;
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
    return [new Date().getFullYear(), (new Date().getMonth()+1), new Date().getDate()];
}
function TGGetIntTableTime(){
    return [new Date().getHours(), (new Date().getMinutes()+1), new Date().getSeconds()];
}
function TGGetMounthSize(){
    if((new Date().getMonth()+1)==2)return 28;
    if(((new Date().getMonth()+1)%2)==0)return 30;
    return 31;
}
//range calculators
function TGWeekDateRange(iDateParameter, sDateScale){
    iDay=new Date().getDay() - 1;
    iDate=TGGetIntTableDate();
    if((iDate[2]=iDate[2]-iDay)<=0){
        switch(iDate[1]){
            case 1:
                iDate[2]+=31;
                iDate[1]=12, 
                iDate[0]--;
                break;
            case 2:
                iDate[2]+=28;
                iDate[1]=1;
                break;
            default:
                if((iDate[1]%2)==0){
                    iDate[2]+=31;
                    iDate[1]--;
                }else{
                    iDate[2]+=30;
                    iDate[1]--;
                }
                break;
        }
    }
    iDayMax=iDate[2]+6;
    iMounthMax=iDate[1];
    iYearMax=(new Date().getFullYear());
    if(iMounthMax==2 && iDayMax>28){
        iDayMax-=28;
        iMounthMax++;
    }else if(iDate[1]%2 && iDayMax>31){
        iDayMax-=31;
        iMounthMax++;
    }else if(iDayMax>30){
        iDayMax-=30;
        iMounthMax++;
    }
    if(iMounthMax>12){
        iMounthMax-=12;
        iYearMax++;
    }
    for(k=0; k<7; k++){
        iDay=iDate[2]+k;
        if(iDate[1]==2 && iDay>28){
            sDateScale[k]=TGCreateDateInStrFormat((iDay-28), iMounthMax, iDate[2]);
        }else if(iDate[1]%2 && iDay>31){
            sDateScale[k]=TGCreateDateInStrFormat((iDay-31), iMounthMax, iDate[2]);
        }else if((iDate[1]%2)==0 && iDay>30){
            sDateScale[k]=TGCreateDateInStrFormat((iDay-30), iMounthMax, iDate[2]);
        }else{
            sDateScale[k]=TGCreateDateInStrFormat(iDay, iDate[1], iDate[2]);
        }
    }
    return [TGCreateDateInStrFormat(iDate[0], iDate[1], iDate[2]), TGCreateDateInStrFormat(iYearMax, iMounthMax, iDayMax)];
}
function TGMounthDateRange(iDate, sDateScale){
    if((iDate[1]<1))iDate[1]=1;
    if(iDate[1]==2){
        iDate[2]=28;
    }else{
        if((iDate[1]%2)==0){
            iDate[2]=30;
        }else{
            iDate[2]=31;
        }
    }
    for(k=0; k<7; k++){
        iResult=0;
        if(iDate[2]==28)iResult=4*k;
        if(iDate[2]==30){
            iResult=5*k;
        }
        if(iDate[2]==31){
            iResult=5*k;
            if(k>2)iResult++;
        }
        sDateScale[k]=TGCreateDateInStrFormat(iDate[0], iDate[1], iResult);
    }
    return [TGCreateDateInStrFormat(iDate[0], iDate[1], 0), TGCreateDateInStrFormat(iDate[0], iDate[1], iDate[2])];
}
function TGYearDateRange(iDate, sDateScale){
    sDateScale[0]=TGCreateDateInStrFormat((iDate[0]-1), 11, 0);
    for(k=0; k<5; k++)sDateScale[k]=TGCreateDateInStrFormat(iDate[0], (1+2*k), 0);
    return [TGCreateDateInStrFormat(iDate[0], 1, 0), TGCreateDateInStrFormat(iDate[0], 12, 31)];
}
function TGDayTimeRange(){
    return [TGCreateDateInStrFormat(0, 0, 0), TGCreateDateInStrFormat(23, 59, 59)];
}

//date comparator
function TGDateCompare(sDateToCompare, sDateMinReference, sDateMaxReference){
    if(sDateMaxReference>TGGetDate())sDateMaxReference=TGGetDate();
    if(sDateMinReference<sDateToCompare && sDateToCompare<sDateMaxReference)return 1;
    return 0;
}

//
function TGCreateTimeInStrFormat(iHours, iMinutes, iSeconds){
    return iHours+":"+iMinutes+":"+iSeconds;
}

function TGCreateDateInStrFormat(iYears, iMounth, iDay){
    sMounth='0';
    if((sMounth=iMounth)<10){
        sMounth='0'+iMounth;
    }
    sDay='0';
    if((sDay=iDay)<10){
        sDay='0'+iDay;
    }
    return iYears+"-"+sMounth+"-"+sDay;
}

function TGConvertTimeToInt(sTime){
    return TGConvertStrFormatToIntFormat(sTime, ":");
}
function TGConvertDateToInt(sDate){
    return TGConvertStrFormatToIntFormat(sDate, "-");
}