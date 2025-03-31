"use strict";


document.getElementById("start").addEventListener("click", () => {
    fetch("slides.json")
        .then(response => response.json())
        .then(data => playSlideshow2(data.slides))
        .catch(error => console.error("Error loading JSON:", error));
});

function playSlideshow(slides) {
    slides.forEach(slide => { // POURQUOI CA MARCHE ; les calls sont en parralèle ?? J'imagine que la réponse est oui mais c'est bizarre
        setTimeout(() => {
            const topDiv = document.getElementById("TOP");
            topDiv.innerHTML = ""; // Clear previous content

            if (slide.url) {
                let iframe = document.createElement("iframe");
                iframe.src = slide.url;
                iframe.width = "800";
                iframe.height = "600";
                topDiv.appendChild(iframe);
            }
        }, slide.time * 1000);
    });
}

function playSlideshow2(slides) {
    for (let slide of slides) {
        setTimeout(() => {
            const topDiv = document.getElementById("TOP");
            topDiv.innerHTML = ""; // Clear previous content

            if (slide.url) {
                let iframe = document.createElement("iframe");
                iframe.src = slide.url;
                iframe.width = "800";
                iframe.height = "600";
                topDiv.appendChild(iframe);
            }
        }, slide.time * 1000);
    };
}