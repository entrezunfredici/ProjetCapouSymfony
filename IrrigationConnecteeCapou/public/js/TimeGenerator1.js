
function TGGetDate(){
    return new Date().getDay()+"_"+new Date().getMonth()+"_"+new Date().getFullYear();
}
function TGGetHours(){
    return new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
}
function TGGetDateWithHours(){
    return TGGetDate()+"/"+TGGetHours();
}
function TGGetDay(){
    Hours=new Date().getHours();
}
function TGGetWeek(){
    Day=new Date().getDay();
    
}