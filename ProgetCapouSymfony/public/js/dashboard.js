function ChangeMenuWhithButton(idButton, buttonClass1, buttonClass2, idBalise){
    baliseID=document.getElementById(idBalise);
    buttonID=document.getElementById(idButton);
    if(baliseID.classList.contains('Hidden')){
        baliseID.classList.remove('Hidden');
        baliseID.classList.add('Show');
    }else if(baliseID.classList.contains('Show')){
        baliseID.classList.remove('Show');
        baliseID.classList.add('Hidden');
    }

    if(buttonID.classList.contains(buttonClass1)){
        buttonID.classList.remove(buttonClass1);
        buttonID.classList.add(buttonClass2);
    }else if(buttonID.classList.contains(buttonClass2)){
        buttonID.classList.remove(buttonClass2);
        buttonID.classList.add(buttonClass1);
    }
}

function Irrigation(idButton, buttonColor1, buttonColor2){
    buttonID=document.getElementById(idButton);
    if(buttonID.classList.contains(buttonColor1)){
        buttonID.classList.remove(buttonColor1);
        buttonID.classList.add(buttonColor2);
        //irrigation on
    }else if(buttonID.classList.contains(buttonColor2)){
        buttonID.classList.remove(buttonColor2);
        buttonID.classList.add(buttonColor1);
        //irrigation off
    }

}
//this function hide one Object and Show one other object
function Change(idBaliseHidden, idBaliseShown){
    Hide(idBaliseHidden);
    Show(idBaliseShown);
}

function Show(idBalise){
    baliseID=document.getElementById(idBalise);
    if(baliseID.classList.contains('Hidden')){
        baliseID.classList.remove('Hidden');
    }
    baliseID.classList.add('Show');
}
function Hide(idBalise){
    baliseID=document.getElementById(idBalise);
    if(baliseID.classList.contains('Show')){
        baliseID.classList.remove('Show');
    }
    baliseID.classList.add('Hidden');
}
