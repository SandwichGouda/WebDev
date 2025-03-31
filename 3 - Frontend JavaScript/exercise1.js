"use strict";

function loadDoc(event) {
    fetch("text.txt")
    .then(response => {
        return response.text()
    })
    .then(text => {
        let txtarea = document.getElementById("tarea");
        txtarea.textContent = text
    })
}

let btn = document.getElementById("b1");
btn.addEventListener("click", loadDoc);

