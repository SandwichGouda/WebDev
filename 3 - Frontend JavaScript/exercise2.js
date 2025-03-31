"use strict";


function buttonClick(event) {
    let tarea = document.getElementById("textedit");
    let message = tarea.value ;
    tarea.value = "";
    fetch("chat.php?phrase="+message)
    .catch(error => console.error(error));
}


