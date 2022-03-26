function DDShowMenuWhithButton(idButton, buttonClass1, buttonClass2, idBalise){
    DDChangeBaliseClass(idBalise, 'Hidden', 'Show')
    DDChangeBaliseClass(idButton, buttonClass1, buttonClass2)
}

function DDDarkThemeClassic(idButton, idInterface){
    DDChangeBaliseClass(idInterface, 'Interface', 'DarkInterface')
    DDChangeBaliseClass(idButton, 'bi-sun', 'bi-moon-stars')
}

function DDDarkThemeForDashboard(idButton, idTopBar, idSidesBar, idDachboard){
    DDChangeBaliseClass(idSidesBar, 'DashBar', 'DarkDashBar')
    DDChangeBaliseClass(idTopBar, 'DashBar', 'DarkDashBar')
    DDChangeBaliseClass(idDachboard, 'DashBoard', 'DarkDashBoard')
    DDChangeBaliseClass(idButton, 'bi-sun', 'bi-moon-stars')
}

//this function hide one Object and Show one other object
function DDChangeBaliseShowed(idBaliseHidden, idBaliseShown){
    DDHideBalise(idBaliseHidden);
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