"use strict";

let JSONdata;
let ICONdata;

fetch("../JSON/smokeInfo.json")
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            JSONdata = data;
        });

fetch("../JSON/smokeIcons.json")
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            ICONdata = data;
        })
        .then(() => {
            preloadPage();
        });

function preloadPage() {
    const params = new URLSearchParams(window.location.search);
    
    let arr = location.href.split('?');
    if (arr.length > 1) {
        let mapParam = params.get('map');
        let locParam = params.get('loc');
        let idParam = params.get('id');
        
        localStorage.setItem('currentMap', mapParam);

        showPopup();
        getDataImg(locParam, idParam);

        //pasalina parametrus, kad refresh'inus puslapi neismestu is naujo popup'o
        var newURL = location.href.split("?")[0];
        window.history.pushState('object', document.title, newURL);
    }

    if ('null' === localStorage.getItem('currentMap')) {
        localStorage.setItem('currentMap', 'mirage');
    }
    updatePage(localStorage.getItem('currentMap'));
    getIconData();
}


function updatePage(mapToUpdateTo, shouldClose = 0) {
    localStorage.setItem('currentMap', mapToUpdateTo);

    if (shouldClose)
        closeMapMenu();
    
    MAPMAINIMG.src = "../images/overviews/" + localStorage.getItem('currentMap') + "_overview.webp";

    getIconData();
}