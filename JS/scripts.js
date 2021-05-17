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


const SETTINGSID = document.getElementById('settingsId');
const SETTINGSBUTTON = document.getElementById('settingsButton');

const USERTHEME = document.getElementById('userTheme');
const LOADVIDEOFIRST = document.getElementById('loadVideoFirst');

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
    PHOTOVIDEOBTN.style.visibility = "hidden";
    IMGBACKICON.style.visibility = "hidden";
}



// Nuotrauku galerijos next ir previous mygtukai
function nextImage() {
    if(index < images.length - 1) {
        index++;
    } else {
        index = 0;
    }
    IMG.src = images[index];
    INSTR.innerHTML = instructions[index];
}


function previousImage() {
    if(index > 0) {
        index--;
    } else {
        index = images.length - 1;
    }
    IMG.src = images[index];
    INSTR.innerHTML = instructions[index];
}

// judėti tarp nuotraukų su rodyklytem
function browseImagesKeyEvent(e) {
    if (e.key == "ArrowRight") {
        if(index < images.length - 1) {
            index++;
        } else {
            index = 0;
        }
        IMG.src = images[index];
        INSTR.innerHTML = instructions[index];
    }
    if (e.key === "ArrowLeft") {
        if(index > 0) {
            index--;
        } else {
            index = images.length - 1;
        }
        IMG.src = images[index];
        INSTR.innerHTML = instructions[index];
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
document.getElementById(localStorage.getItem("typeActiveID")).classList.add("active");
document.getElementById(localStorage.getItem("tickActiveID")).classList.add("active");

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
    }

    document.getElementById("noHover").remove();
    noHover();
}

let checkClose = false;
let checkOpen = true;


// display neveikia su transition ;(
// galbut veiks su scale arba visibility
function openMenu() {
    if (checkOpen) {
        SETTINGSID.style.display = 'block';
        document.body.setAttribute("onclick", "closeMenu()");
        SETTINGSBUTTON.removeAttribute("onclick", "openMenu()");
        checkOpen = false;
    }
}

function closeMenu() {
    if (checkClose) {
        setTimeout(() => {
            SETTINGSID.style.display = 'none';
        }, 0);
        document.body.removeAttribute("onclick");
        checkClose = false;
        checkOpen = true;
    } else {
        checkClose = true;
        SETTINGSBUTTON.setAttribute("onclick", "openMenu()");
    }
}


// default localstorage
if (localStorage.getItem('userTheme') ===  null && localStorage.getItem('loadVideoFirst') ===  null) 
{
    localStorage.setItem("userTheme", "false");
    localStorage.setItem("loadVideoFirst", "false");
}

if (localStorage.getItem('userTheme') === "false") {
    USERTHEME.innerHTML = "Dark theme: false";
} else {
    USERTHEME.innerHTML = "Dark theme: true";
}
if (localStorage.getItem('loadVideoFirst') == "false") {
    LOADVIDEOFIRST.innerHTML = "Load video first: false";
} else {
    LOADVIDEOFIRST.innerHTML = "Load video first: true";
}

// nustatymu onclick pakeitimai (prastai padariau kol kas)
function settingChange(setting) {
    // closeMenu kitaip suveiks ir uždarys settings
    checkClose = false;
    if (setting === "userTheme") {
        if (localStorage.getItem('userTheme') === "false") {
            localStorage.setItem("userTheme", "true");
            USERTHEME.innerHTML = "Dark theme: true";
        } else {
            localStorage.setItem("userTheme", "false");
            USERTHEME.innerHTML = "Dark theme: false";
        }
    }
    if (setting === "loadVideoFirst") {
        if (localStorage.getItem('loadVideoFirst') == "false") {
            localStorage.setItem("loadVideoFirst", "true");
            LOADVIDEOFIRST.innerHTML = "Load video first: true";
        } else {
            localStorage.setItem("loadVideoFirst", "false");
            LOADVIDEOFIRST.innerHTML = "Load video first: false";
        }
    }
}