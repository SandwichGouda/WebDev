"use strict";

let showButton = document.getElementById("SHOW_B");
let addButton = document.getElementById("BUT_ADD");
let removeButton = document.getElementById("REMOVE");
let clearButton = document.getElementById("CLEAR");
let restoreButton = document.getElementById("RESTORE");

let showPlace = document.getElementById("MAINSHOW");

let indexTF = document.getElementById("indexTF");
let titleTF = document.getElementById("titleTF");
let colorTF = document.getElementById("colorTF");
let valueTF = document.getElementById("valueTF");

function showTxt(event) {
    fetch("../../Data")
    .then(response => response.text())
    .then(jsonString => showPlace.innerHTML = jsonString);
}

function addElement(event) {
    fetch("../../add?title="+titleTF.value+"&value="+valueTF.value+"&color="+colorTF.value)
    .then( () => (1));
}

function removeElement(event) {
    fetch("../../remove?index="+indexTF.value)
    .then( () => (1));
}

function clear(event) {
    fetch("../../clear")
    .then( () => (1));
}

function restore(event) {
    fetch("../../restore")
    .then( () => (1));
}

showButton.addEventListener("click", showTxt);
addButton.addEventListener("click", addElement);
removeButton.addEventListener("click", removeElement);
clearButton.addEventListener("click", clear);
restoreButton.addEventListener("click", restore);