function ChangeMenuWhithButton(idButton, buttonClass1, buttonClass2, idObject){
    objectID=document.getElementById(idObject);
    buttonID=document.getElementById(idButton);
    
    if(objectID.classList.contains('Hidden')){
        objectID.classList.remove('Hidden');
        objectID.classList.add('Show');
    }else if(objectID.classList.contains('Show')){
        objectID.classList.remove('Show');
        objectID.classList.add('Hidden');
    }

    if(buttonID.classList.contains(buttonClass1)){
        buttonID.classList.remove(buttonClass1);
        buttonID.classList.add(buttonClass2);
    }else if(buttonID.classList.contains(buttonClass2)){
        buttonID.classList.remove(buttonClass2);
        buttonID.classList.add(buttonClass1);
    }
}
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
