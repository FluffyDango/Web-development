"use strict";

function chPathName(whatMap) {
    localStorage.setItem('currentMap', whatMap);
    window.location.pathname = "/html/smokesMapVersion.html";
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