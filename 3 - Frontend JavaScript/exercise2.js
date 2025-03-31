"use strict";


function buttonClick(event) {
    let tarea = document.getElementById("textedit");
    let message = tarea.value ;
    tarea.value = "";
    fetch("chat.php?phrase="+message)
    .catch(error => console.error(error));
}


function reload(event) {
    let chatplace = document.getElementById("tarea");
    chatplace.innerHTML = ""
    fetch("chatlog.txt")
    .then(response => {
        return response.text()
    })
    .then(text => {
        let t = text.split("\n");
        console.log(t)
        t.reverse();
        t = t.slice(-10);
        for (let message of t) {
            let p = document.createElement("p");
            p.textContent = message;
            chatplace.appendChild(p);
        }
    })    
}   

setInterval(reload, 1000);
