function ChangeMenuWhithButton(idButton, buttonClass1, buttonClass2, idBalise){
    baliseID=document.getElementById(idBalise);
    if(baliseID.classList.contains('Hidden')){
        baliseID.classList.remove('Hidden');
        baliseID.classList.add('Show');
    }else if(baliseID.classList.contains('Show')){
        baliseID.classList.remove('Show');
        baliseID.classList.add('Hidden');
    }
    ChangeButtonClass(idButton, buttonClass1, buttonClass2)
}

function Irrigation(idButton, buttonColor1, buttonColor2){
    if(ConfirmChangement("êtes ou sur(e) de vouloir modifier l'état de la vanne?")){
        mode=ChangeButtonClass(idButton, buttonColor1, buttonColor2);
        if(mode==1){
            //irrigation off
        }else if(mode==2){
            //irrigation on
        }
    }
}

function DarkTheme(idButton, idTopBar, idSidesBar, idDachboard){
    ChangeButtonClass(idSidesBar, 'DashBar', 'DarkDashBar')
    ChangeButtonClass(idTopBar, 'DashBar', 'DarkDashBar')
    ChangeButtonClass(idDachboard, 'DashBoard', 'DarkDashBoard')
    ChangeButtonClass(idButton, 'bi-sun', 'bi-moon-stars')
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

function ChangeButtonClass(idButton, class1, class2){
    buttonID=document.getElementById(idButton);
    if(buttonID.classList.contains(class1)){
        buttonID.classList.remove(class1);
        buttonID.classList.add(class2);
        return 1;
    }else if(buttonID.classList.contains(class2)){
        buttonID.classList.remove(class2);
        buttonID.classList.add(class1);
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