function Change(id_Object_Hidden, id_Object_Shown){
    Hide(id_Object_Hidden);
    Show(id_Object_Shown);
}
function Show(id_Object){
    objectID=document.getElementById(id_Object);
    if(objectID.classList.contains('Hidden')){
        objectID.classList.remove('Hidden');
    }
    objectID.classList.add('Show');
}
function Hide(id_Object){
    objectID=document.getElementById(id_Object);
    if(objectID.classList.contains('Show')){
        objectID.classList.remove('Show');
    }
    objectID.classList.add('Hidden');
}
