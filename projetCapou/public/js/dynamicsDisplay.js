function DDShowMenuWhithButton(idButton, buttonClass1, buttonClass2, idBalise){
    DDChangeBaliseClass(idBalise, 'Hidden', 'Show')
    DDChangeBaliseClass(idButton, buttonClass1, buttonClass2)
}

function DDChangeTheme(sInterfaceID, sBackColorFirstTheme, sBackColorSecondBackTheme, sElemColorFirstTheme, sElemColorSecondTheme, sButtonFirstTheme, sButtonSecondTheme){
    if($('#'+sInterfaceID).hasClass(sBackColorFirstTheme)){
        $('.'+sBackColorFirstTheme).removeClass(sBackColorFirstTheme).addClass(sBackColorSecondBackTheme);
        $('.'+sButtonFirstTheme).removeClass(sButtonFirstTheme).addClass(sButtonSecondTheme);
        $('.'+sElemColorFirstTheme).removeClass(sElemColorFirstTheme).addClass(sElemColorSecondTheme);
    }else if($('#'+sInterfaceID).hasClass(sBackColorSecondBackTheme)){
        $('.'+sBackColorSecondBackTheme).removeClass(sBackColorSecondBackTheme).addClass(sBackColorFirstTheme);
        $('.'+sButtonSecondTheme).removeClass(sButtonSecondTheme).addClass(sButtonFirstTheme);
        $('.'+sElemColorSecondTheme).removeClass(sElemColorSecondTheme).addClass(sElemColorFirstTheme);
    }
}

//this function hide one Object and Show one other object
function DDChangeBaliseShowed(idBaliseHidden1, idBaliseHidden2, idBaliseShown){
    DDHideBalise(idBaliseHidden1);
    DDHideBalise(idBaliseHidden2);
    DDShowBalise(idBaliseShown);
}

function ConfirmChangement(message) {
    if (confirm(message)) {
        // Clic sur OK
        return 1;
    }
    return 0;
}

function DDChangeBaliseClass(idBalise, class1, class2){
    baliseID=document.getElementById(idBalise);
    if(baliseID.classList.contains(class1)){
        baliseID.classList.remove(class1);
        baliseID.classList.add(class2);
        return 1;
    }else if(baliseID.classList.contains(class2)){
        baliseID.classList.remove(class2);
        baliseID.classList.add(class1);
        return 2;
    }
    return 0;
}

function DDShowBalise(idBalise){
    baliseID=document.getElementById(idBalise);
    if(baliseID.classList.contains('Hidden')){
        baliseID.classList.remove('Hidden');
    }
    baliseID.classList.add('Show');
}
function DDHideBalise(idBalise){
    baliseID=document.getElementById(idBalise);
    if(baliseID.classList.contains('Show')){
        baliseID.classList.remove('Show');
    }
    baliseID.classList.add('Hidden');
}