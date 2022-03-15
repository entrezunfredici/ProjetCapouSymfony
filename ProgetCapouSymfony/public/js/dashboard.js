function Change(id_Object_Hidden, id_Object_Shown){
    Hide(id_Object_Hidden);
    Show(id_Object_Shown);
}
function Show(id_Object){
    document.getElementById(id_Object).classList.remove('Hidden');
    document.getElementById(id_Object).classList.add('Show');
}
function Hide(id_Object){
    document.getElementById(id_Object).classList.remove('Show');
    document.getElementById(id_Object).classList.add('Hidden');
}