//listes des couleurs
specBlue="#0090d4";//bleu de la charte graphique
specOrange="#eb6e1d";//ORange de la charte graphique
specRed="#b80718";//rouge de la charte graphique
specBrown="#622a27";//marron de la charte graphique
specGreen="#b1c903";//vert de la charte graphique
backgroundColor="#383e42";//couleur de fond

mode="";
document.addEventListener('DOMContentLoaded', function() {
    //attribution des couleurs
    //couleur du body
    document.body.style.background = backgroundColor;
    //couleur des fonds
    SetBkgndColorByID('footer', specBrown);
    //couleurs des textes
    SetTxtColorByID('main', specBlue);
});
function SetBkgndColorByID(id, color){
    document.getElementById(id).style.background = color;
}
function SetTxtColorByID(id, color){
    document.getElementById(id).setAttribute("style", "color:"+color); 
}