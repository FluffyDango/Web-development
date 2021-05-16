"use strict";

function preloadPage() {
    const params = new URLSearchParams(window.location.search);
    
    var arr = location.href.split('?');
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
}

function updatePage(mapToUpdateTo) {
    localStorage.setItem('currentMap', mapToUpdateTo);
    
    if (window.location.pathname != "/html/smokesMapVersion.html") {
        window.location.pathname = "/html/smokesMapVersion.html";
    }
    
    const overviews = "../images/overviews/";

    switch (mapToUpdateTo) {
        case "mirage":
            MAPMAINIMG.src = overviews + "mirage_overview.webp";
            break;
        case "inferno":
            MAPMAINIMG.src = overviews + "inferno_overview.webp";
            break;
        case "overpass":
            MAPMAINIMG.src = overviews + "overpass_overview.webp";
            break;
        case "dust2":
            MAPMAINIMG.src = overviews + "dust2_overview.webp";
            break;
        case "cache":
            MAPMAINIMG.src = overviews + "cache_overview.webp";
            break;
        case "train":
            MAPMAINIMG.src = overviews + "train_overview.webp";
            break;
        case "nuke":
            MAPMAINIMG.src = overviews + "nuke_overview.webp";
            break;
        case "vertigo":
            MAPMAINIMG.src = overviews + "vertigo_overview.webp";
            break;
        default:
            MAPMAINIMG.src = overviews + "mirage_overview.webp";
            break;
    }
    getIconData();
}