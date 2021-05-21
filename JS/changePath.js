"use strict";

function chPathName(whatMap) {
    localStorage.setItem('currentMap', whatMap);
    window.location.pathname = "/html/smokesMapVersion.html";
}

function openMapMenu() {
    MAINPOPUP.style.visibility = "visible";
    MAINPOPUP.style.opacity = "1";
    MAINPOPUP.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    let icon = document.createElement('div');
    // icon.classList.add('fas fa-times fa-2x');
    icon.className = "fas fa-times fa-2x";
    icon.id = "mapMenuButton";
    icon.setAttribute("onclick", "closeMapMenu();");
    document.body.appendChild(icon);

    let mapMenuItems = document.createElement('div');
    mapMenuItems.className = "mapMenuItems";
    mapMenuItems.innerHTML = `<div onclick="updatePage('mirage', 1);">Mirage</div>
    <div onclick="updatePage('inferno', 1);">Inferno</div>
    <div onclick="updatePage('overpass', 1);">Overpass</div>
    <div onclick="updatePage('dust2', 1);">Dust 2</div>
    <div onclick="updatePage('cache', 1);>Cache</div>
    <div onclick="updatePage('train', 1);>Train</div>
    <div onclick="updatePage('nuke', 1);>Nuke</div>
    <div onclick="updatePage('vertigo', 1);>Vertigo</div>`;
    document.body.appendChild(mapMenuItems);
}

function closeMapMenu() {
    MAINPOPUP.style.visibility = "hidden";
    MAINPOPUP.style.opacity = "0";
    MAINPOPUP.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
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