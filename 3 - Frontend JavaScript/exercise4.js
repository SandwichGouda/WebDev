"use strict";

let slides;
let numberOfSlides;
let counter = -1;
let pause = false;
let div;
let timeout;

/* loads the slides.json file with AJAX and renders the object described in the file */
function load() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "slides.json");
    xhr.onload = function () {
        slides = JSON.parse(this.responseText);
        numberOfSlides = slides.slides.length;
    }
    xhr.send();
}