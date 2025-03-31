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

function loadDoc2() {
    fetch("text.txt")
    .then(response => response.text())
    .then(text => {
        // let t = text.split("<br/>\n");
        let t = text.split("\n");
        let colors = ["red","green","blue","purple","orange","gray"]
        let div = document.getElementById("tarea2");
        for (let k in t) {
            let p = document.createElement("p");
            p.setAttribute("style","color : "+colors[k]+"\n");
            p.textContent = t[k];
            div.appendChild(p)
        }
    })
}

let btn2 = document.getElementById("b2");
btn2.addEventListener("click", loadDoc2);