"use strict";

const SETTINGSID = document.getElementById('settingsId');
const SETTINGSBUTTON = document.getElementById('settingsButton');

const USERTHEME = document.getElementById('userTheme');
const LOADVIDEOFIRST = document.getElementById('loadVideoFirst');




function chPathName(whatPath, nades = 1) {
    if (nades) {
        localStorage.setItem('currentMap', whatPath);
        window.location.pathname = "/html/smokesMapVersion.html";
    } else {
        window.location.pathname = "/html/" + whatPath + ".html";
    }
}

function openMapMenu() {
    let mapMenuBackground = document.createElement('div');
    mapMenuBackground.className = "popupBackground";
    mapMenuBackground.id = "mapMenuBackground";
    document.body.appendChild(mapMenuBackground);

    let icon = document.createElement('div');
    icon.className = "fas fa-times fa-2x";
    icon.id = "mapMenuButton";
    icon.setAttribute("onclick", "closeMapMenu();");
    document.body.appendChild(icon);

    let mapMenuItems = document.createElement('div');
    mapMenuItems.className = "mapMenuItems";
    if (window.location.pathname != "/html/smokesMapVersion.html" ) {
        mapMenuItems.innerHTML = `<div onclick="chPathName('mirage');">Mirage</div>
        <div onclick="chPathName('inferno');">Inferno</div>
        <div onclick="chPathName('overpass');">Overpass</div>
        <div onclick="chPathName('dust2');">Dust 2</div>
        <div onclick="chPathName('cache');>Cache</div>
        <div onclick="chPathName('train');>Train</div>
        <div onclick="chPathName('nuke');>Nuke</div>
        <div onclick="chPathName('vertigo');>Vertigo</div>`;
    } else {
        mapMenuItems.innerHTML = `<div onclick="updatePage('mirage', 1);">Mirage</div>
        <div onclick="updatePage('inferno', 1);">Inferno</div>
        <div onclick="updatePage('overpass', 1);">Overpass</div>
        <div onclick="updatePage('dust2', 1);">Dust 2</div>
        <div onclick="updatePage('cache', 1);>Cache</div>
        <div onclick="updatePage('train', 1);>Train</div>
        <div onclick="updatePage('nuke', 1);>Nuke</div>
        <div onclick="updatePage('vertigo', 1);>Vertigo</div>`;
    }
    document.body.appendChild(mapMenuItems);

    let mapMenuNavLinks = document.createElement('div');
    mapMenuNavLinks.className = "mapMenuItems";
    mapMenuNavLinks.id = "mapMenuNavLinks";
    mapMenuNavLinks.innerHTML = `<div onclick="chPathName('settings', 0);">Settings</div>
    <div onclick="chPathName('TipsAndTricks', 0);">Tips and Tricks</div>
    <div onclick="chPathName('configs', 0);">Configs</div>`
    document.body.appendChild(mapMenuNavLinks);
}

function closeMapMenu() {
    document.getElementById('mapMenuBackground').remove();
    document.getElementById('mapMenuButton').remove();
    document.getElementsByClassName('mapMenuItems')[0].remove();
}

function copyToClipboard(id) {
    let text = document.getElementById(id).innerHTML;

    // nuema whitespace pries teksta
    text = text.replace(/^\s+|\s+$/gm, '');

    if (text.match(/<li>/)) {
        // panaikina visus <li> ar </li>
        text = text.replace(/<\/?li>/g, '');
        // panaikina visas eilutes su <p> tag
        text = text.replace(/^.*<p>.*$\n?/gm, '');
        // panaikina <br>
        text = text.replace(/<br>/g, '');
        console.log(text);
    }
    else {
        // panaikina visus <p> ar </p>
        text = text.replace(/<\/?p>/g, '');
        // panaikina <br>
        text = text.replace(/<br>/g, '');
    }
    
    navigator.clipboard.writeText(text).then(() => {
        alert('Copying to clipboard was successful!');
    }, () => {
        alert('Error');
    })
}


let checkClose = false;
let checkOpen = true;

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