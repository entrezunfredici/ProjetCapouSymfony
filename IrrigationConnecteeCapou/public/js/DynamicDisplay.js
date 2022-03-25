function ChangeMenuWhithButton(idButton, buttonClass1, buttonClass2, idBalise){
    ChangeBaliseClass(idBalise, 'Hidden', 'Show')
    ChangeBaliseClass(idButton, buttonClass1, buttonClass2)
}

function Irrigation(idButton, buttonColor1, buttonColor2){
    if(ConfirmChangement("êtes ou sur(e) de vouloir modifier l'état de la vanne?")){
        mode=ChangeBaliseClass(idButton, buttonColor1, buttonColor2);
        if(mode==1){
            //irrigation off
        }else if(mode==2){
            //irrigation on
        }
    }
}

function DarkThemeClassic(idButton, idInterface){
    ChangeBaliseClass(idInterface, 'Interface', 'DarkInterface')
    ChangeBaliseClass(idButton, 'bi-sun', 'bi-moon-stars')
}

function DarkThemeForDashboard(idButton, idTopBar, idSidesBar, idDachboard){
    ChangeBaliseClass(idSidesBar, 'DashBar', 'DarkDashBar')
    ChangeBaliseClass(idTopBar, 'DashBar', 'DarkDashBar')
    ChangeBaliseClass(idDachboard, 'DashBoard', 'DarkDashBoard')
    ChangeBaliseClass(idButton, 'bi-sun', 'bi-moon-stars')
}

//this function hide one Object and Show one other object
function Change(idBaliseHidden, idBaliseShown){
    Hide(idBaliseHidden);
    Show(idBaliseShown);
}

function ConfirmChangement(message) {
    if (confirm(message)) {
        // Clic sur OK
        return 1;
    }
    return 0;
}

function ChangeBaliseClass(idBalise, class1, class2){
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