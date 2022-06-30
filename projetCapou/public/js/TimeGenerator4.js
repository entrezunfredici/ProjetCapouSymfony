//getters
//getter return string 
function TGGetDate(){
    sMounth="0";
    sDay="0";
    if((sMounth=iMounth=new Date().getMonth()+1)<10){
        sMounth="0"+iMounth;
    }
    if((sDay=iDay=new Date().getDate())<10){
        sDay="0"+iDay
    }
    return new Date().getFullYear()+"-"+sMounth+"-"+sDay;
}

function TGGetTime(){
    sHours="0";
    sMinutes="0";
    sSeconds="0";
    if(new Date().getHours()<10){
        sHours="0"+new Date().getHours()
    }else sHours=new Date().getHours()
    if(new Date().getMinutes()<10){
        sMinutes="0"+new Date().getMinutes();
    }else sMinutes=new Date().getMinutes();
    if(new Date().getSeconds()<10){
        sSeconds="0"+new Date().getSeconds();
    }else sSeconds=new Date().getSeconds();
    return sHours+":"+sMinutes+":"+sSeconds;
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
function TGGetThisMounthSize(){
    if((new Date().getMonth()+1)==2)return 28;
    if(((new Date().getMonth()+1)%2)==0)return 30;
    return 31;
}
function TGGetMounthSize(iMounth){
    if(iMounth==2)return 28;
    if((iMounth%2)==0)return 30;
    return 31;
}

//range calculators
function TGDayDateRange(){
    return [TGCreateDateWithTime(TGGetDate(), TGCreateTimeInStrFormat(0, 0, 0)),TGCreateDateWithTime(TGGetDate(), TGCreateTimeInStrFormat(23, 59, 59))]
}
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
    //return [TGCreateDateInStrFormat(iDate[0], iDate[1], iDate[2]), TGCreateDateWithTime(TGCreateDateInStrFormat(iYearMax, iMounthMax, iDayMax)];
    return [TGCreateDateWithTime(TGCreateDateInStrFormat(iDate[0], iDate[1], iDate[2]), TGCreateTimeInStrFormat(0, 0, 0)), TGCreateDateWithTime(TGCreateDateInStrFormat(iYearMax, iMounthMax, iDayMax), TGCreateTimeInStrFormat(23, 59, 59))];
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
    //return [TGCreateDateInStrFormat(iDate[0], iDate[1], 0), TGCreateDateInStrFormat(iDate[0], iDate[1], iDate[2])];
    return [TGCreateDateWithTime(TGCreateDateInStrFormat(iDate[0], iDate[1], 0), TGCreateTimeInStrFormat(0, 0, 0)), TGCreateDateWithTime(TGCreateDateInStrFormat(iDate[0], iDate[1], iDate[2]), TGCreateTimeInStrFormat(23, 59, 59))];
}
function TGYearDateRange(iDate, sDateScale){
    sDateScale[0]=TGCreateDateInStrFormat((iDate[0]-1), 11, 0);
    for(k=0; k<5; k++)sDateScale[k]=TGCreateDateInStrFormat(iDate[0], (1+2*k), 0);
    //return [TGCreateDateInStrFormat(iDate[0], 1, 1), TGCreateDateInStrFormat(iDate[0], 12, 31)];
    return [TGCreateDateWithTime(TGCreateDateInStrFormat(iDate[0], 1, 1), TGCreateTimeInStrFormat(0, 0, 0)), TGCreateDateWithTime(TGCreateDateInStrFormat(iDate[0], 12, 31), TGCreateTimeInStrFormat(23, 59, 59))];
}

//date comparator
function TGDateCompare(sDateToCompare, sDateMinReference, sDateMaxReference){
    if(sDateMaxReference>TGGetDate())sDateMaxReference=TGGetDate();
    return (sDateMinReference<=sDateToCompare && sDateToCompare<=sDateMaxReference);
}
//date comparator
function TGDateWithTimeCompare(sDateWithTimeToCompare, sDateWithTimeMinReference, sDateWithTimeMaxReference){
    if(sDateWithTimeMaxReference>TGGetDateWithTime())sDateWithTimeMaxReference=TGGetDateWithTime();
    return (sDateWithTimeMinReference<=sDateWithTimeToCompare && sDateWithTimeToCompare<=sDateWithTimeMaxReference);
}

function TGCreateDateWithTime(sDate, sTime){
    return sDate+"/"+sTime;
}

//
function TGCreateTimeInStrFormat(iHours, iMinutes, iSeconds){
    sHours="0";
    sMinutes="0";
    sSeconds="0";
    if((sHours=iHours)<10){
        sHours="0"+iHours;
    }
    if((sMinutes=iMinutes)<10){
        sMinutes="0"+iMinutes;
    }
    if((sSeconds=iSeconds)<10){
        sSeconds="0"+iSeconds;
    }
    return sHours+":"+sMinutes+":"+sSeconds;
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