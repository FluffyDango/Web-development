"use strict";

let result;

function getData(loc) {
    result = "";

    if (typeof map[loc] === "undefined") {
        SMOKETITLE.innerHTML = "undefined";
    } 
    else {
        SMOKETITLE.innerHTML = map[loc].title + " " + localStorage.getItem('typeActive');
    
        for (let id = 1; id < Object.keys(map[loc]).length; id++) {
            if (localStorage.getItem('tickActiveID') === "tick1" && map[loc][id].tickrate.includes("64")) {
                loadSmokeBoxMap(loc, id);
            }
            else if (localStorage.getItem('tickActiveID') === "tick2" && map[loc][id].tickrate.includes("128")) {
                loadSmokeBoxMap(loc, id);
            }
            else if (map[loc][id].tickrate.includes("128 64")) {
                loadSmokeBoxMap(loc, id);
            }
        }
        document.getElementById('JSONinfo').innerHTML = result;
    }
}

function loadSmokeBoxMap (loc, id) {
    result += "<div class='smokeBoxMap' id='smokeBoxMap' ";

    // iškart užkraus video jeigu per settings pasirinkai  taip
    if (localStorage.getItem('loadVideoFirst') == "false") {
        result += "onclick='getDataImg(" + loc + "," + id + ")'";
    } else {
        result += "onclick='playVideo(" + loc + "," + id + ")'";
    }

    // smoke'o dėžės pavadinimas
    result += "><h3>" + "from\ " + map[loc][id].from;

    // ar one way
    if (map[loc][id].oneway == true) {
        result += "<i class='fas fa-arrow-alt-circle-up fa-1x' title='One-Way Smoke'></i>";
    }

    // nuotrauka ir views
    result += "</h3><img src='" + map[loc][id].img[0] + "'>";

    result += "<h3 id='views'>tickrate " + map[loc][id].tickrate + "</h3><div class ='decorationNade'><i class='"

    if (localStorage.getItem("typeActive") === "smoke") {
        result += "fas fa-cloud fa-10x"
    } else if (localStorage.getItem("typeActive") === "molotov") {
        result += "fas fa-fire fa-10x"
    } else if (localStorage.getItem("typeActive") === "flash") {
        result += "fas fa-bolt fa-10x"
    } else {
        result += "fas fa-bomb fa-10x"
    }


    result += "'></i></div></div>";
}

function clearPopup() {
    JSONINFO.innerHTML = "";
    IFRAME.innerHTML = "";
    IFRAME.src = "";
    POPUPPHOTO.innerHTML = "<img id='imgSrc'/>";
    document.removeEventListener("keydown", browseImagesKeyEvent);
    POPUPPHOTO.style.boxShadow = "";
}