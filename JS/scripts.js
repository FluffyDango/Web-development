"use strict";

let index = 0;

let images;
let instructions;

const NEXT = document.getElementById('nextImg');
const PREV = document.getElementById('prevImg');
const IMG = document.getElementById('imgSrc');
const VID = document.getElementById('iframe');
const INSTR = document.getElementById('smokeInstructions');
const MAINPOPUP = document.getElementById('mainPopup');
const MAPMAINIMG = document.getElementById('mapMainImg');
const PHOTOVIDEOBTN = document.getElementById('photoVideoBtn');
const IMGBACKICON = document.getElementById('imgBackIcon');
const PHOTOVIDEOSWAP = document.getElementById('photoVideoSwap');
const POPUPPHOTO = document.getElementById('popupPhoto');
const SMOKETITLE = document.getElementById('smokeTitle');
const JSONINFO = document.getElementById('JSONinfo');
const IFRAME = document.getElementById('iframe');
const SMOKEICONHOLDER = document.getElementById('smokeIconHolder');
const SMOKESHARE = document.getElementById('smokeShare');
const SMOKESHAREBTN = document.getElementById('smokeShareBtn');

function escapePopup(event) {
    if (event.key === 'Escape') {
        hidePopup('mainPopup');
    }
}

function showPopup() {
    MAINPOPUP.style.visibility = "visible";
    MAINPOPUP.style.opacity = "1";
    document.body.style.overflow = "hidden";
    document.getElementById('popup').style.transform = "scale(1)";

    // Nuotraukos isjungimas, paspaudus Escape mygtuka
    document.addEventListener("keydown", escapePopup);
}

function hidePopup() {
    document.body.style.overflow = "visible";
    document.getElementById('popup').style.transform = "scale(0)";
    MAINPOPUP.style.visibility = "hidden";
    PHOTOVIDEOBTN.style.visibility = "hidden";
    SMOKESHAREBTN.style.visibility = "hidden";
    IMGBACKICON.style.visibility = "hidden";
    MAINPOPUP.style.opacity = "0";
    quitVideo();

    document.removeEventListener("keydown", escapePopup);
    setTimeout(() => {
        clearPopup();
        PHOTOVIDEOBTN.style.visibility = "hidden";
    }, 100);
}

function backPage(loc) {
    clearPopup();
    getData(loc);
    quitVideo();
    SMOKESHAREBTN.style.visibility = "hidden";
    PHOTOVIDEOBTN.style.visibility = "hidden";
    IMGBACKICON.style.visibility = "hidden";
}

// share mygtukas
function shareSmoke(map, loc, id) {
    let smokeParameters = location.hostname + ":" + location.port + location.pathname + "?map=" + map + "&loc=" + loc + "&id=" + id;
    window.prompt("Copy to clipboard: Ctrl+C, Enter", smokeParameters);
}

// Nuotrauku galerijos next ir previous mygtukai
function nextImage() {
    if(index < images.length - 1) {
        index++;
    } else {
        index = 0;
    }
    document.getElementById('imgSrc').src = images[index];
    document.getElementById('smokeInstructions').innerHTML = instructions[index];
}


function previousImage() {
    if(index > 0) {
        index--;
    } else {
        index = images.length - 1;
    }
    document.getElementById('imgSrc').src = images[index];
    document.getElementById('smokeInstructions').innerHTML = instructions[index];
}

// judėti tarp nuotraukų su rodyklytem
function browseImagesKeyEvent(e) {
    if (e.key == "ArrowRight") {
        if(index < images.length - 1) {
            index++;
        } else {
            index = 0;
        }
        document.getElementById('imgSrc').src = images[index];
        document.getElementById('smokeInstructions').innerHTML = instructions[index];
    }
    if (e.key === "ArrowLeft") {
        if(index > 0) {
            index--;
        } else {
            index = images.length - 1;
        }
        document.getElementById('imgSrc').src = images[index];
        document.getElementById('smokeInstructions').innerHTML = instructions[index];
    }
}

// default localstorage
if (localStorage.getItem("typeActive") === null) { 
    localStorage.setItem("typeActive", "smoke");
    localStorage.setItem("typeActiveID", "type1");
}
if (localStorage.getItem("tickActiveID") === null) {
    localStorage.setItem("tickActiveID", "tick1")
}

// darom kad ant selected hover nebutu sviesios spalvos
function noHover() {
    const css = `
    #${localStorage.getItem('typeActiveID')}:hover,
    #${localStorage.getItem('tickActiveID')}:hover { 
    background-color: #945a04
    }`;
    let style = document.createElement('style');
    style.id = "noHover";
    style.appendChild(document.createTextNode(css));

    document.getElementsByTagName('head')[0].appendChild(style);
}
noHover();

// uždedam tas kas yra active
if (window.location.pathname.match(/smokesMapVersion/)) {
    document.getElementById(localStorage.getItem("typeActiveID")).classList.add("active");
    document.getElementById(localStorage.getItem("tickActiveID")).classList.add("active");
}

// filtru spalva pakeicia onclick (changeFilter)
function chFilter(id, type) {
    const TARGET = document.getElementById(id);

    if (id.includes("type")) {
        document.getElementById(localStorage.getItem("typeActiveID")).classList.remove("active");
        localStorage.setItem("typeActiveID", id);
        localStorage.setItem("typeActive", type);
        TARGET.classList.add("active");
        getIconData();
    }

    else if (id.includes("tick")) {
        document.getElementById(localStorage.getItem("tickActiveID")).classList.remove("active");
        localStorage.setItem("tickActiveID", id);
        TARGET.classList.add("active");
        getIconData();
    }

    document.getElementById("noHover").remove();
    noHover();
}