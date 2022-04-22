function DDShowMenuWhithButton(idButton, buttonClass1, buttonClass2, idBalise){
    DDChangeBaliseClass(idBalise, 'Hidden', 'Show')
    DDChangeBaliseClass(idButton, buttonClass1, buttonClass2)
}

function DDDarkThemeClassic(idButton, idInterface){
    DDChangeBaliseClass(idInterface, 'Interface', 'DarkInterface')
    DDChangeBaliseClass(idButton, 'bi-sun', 'bi-moon-stars')
}

function DDDarkThemeClassicWithOtherButton(idButton, idButton2, idInterface){
    DDChangeBaliseClass(idInterface, 'Interface', 'DarkInterface')
    DDChangeBaliseClass(idButton, 'bi-sun', 'bi-moon-stars')
    DDChangeBaliseClass(idButton2, 'bi-sun', 'bi-moon-stars')
}

function DDDarkThemForDashboard(idButton, idDahBar, idSideBar, idDashBoard){
    DDChangeBaliseClass(idDashBoard, 'DashBoard', 'DarkDashBoard')
    DDChangeBaliseClass(idSideBar, 'DashBar', 'DarkDashBar')
    DDChangeBaliseClass(idDahBar, 'DashBar', 'DarkDashBar')
    DDChangeBaliseClass(idButton, 'bi-sun', 'bi-moon-stars')
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