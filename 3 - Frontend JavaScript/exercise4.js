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

load();

function updateSlide() {
    div = document.getElementById("TOP");
    div.innerHTML = "";

    let frame = document.createElement("iframe");
    frame.src = slides.slides[counter].url;
    frame.height = "100%";
    frame.width = "100%";
    
    div.appendChild(frame);
}

function play() {
    counter++;
    
    div = document.getElementById("TOP");
    div.innerHTML = "";

    updateSlide();

    if (counter < numberOfSlides && !pause) {
        timeout = setTimeout(play, 2000);
    }
}

function pauseBut() {
    if (!pause) {
        pause = true;
        clearTimeout(timeout);
    } else {
        pause = false;
        play();
    }
}

function next() {
    pause = true;
    
    if (counter < numberOfSlides) {
        counter++;
        updateSlide();
    
    } else { return; }
}

function previous() {
    pause = true;
    
    if (counter > 0) {
        counter--;
        updateSlide();
    } else { return; }
}