"use strict";

let JSONdata;

function getData(loc) {
    fetch("../JSON/smokeInfo.json")
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            JSONdata = data;
            if (localStorage.getItem('currentMap') === "mirage")
                map = JSONdata.mirage[localStorage.getItem('typeActive')];
            else if (localStorage.getItem('currentMap') === "inferno")
                map = JSONdata.inferno[localStorage.getItem('typeActive')];
            smokeLoad(loc)
        });
}

let result;

function smokeLoad(loc) {
    result = "";

    if (typeof map[loc] === "undefined") {
        document.getElementById('smokeTitle').innerHTML = "undefined";
    } 
    else {
        document.getElementById('smokeTitle').innerHTML = map[loc].title + " " + localStorage.getItem('typeActive');
    
        for (let id = 1; id < Object.keys(map[loc]).length; id++) {
            if (localStorage.getItem('tick1') === "true" && map[loc][id].tickrate.includes("64")) {
                loadSmokeBoxMap(loc, id);
            }
            else  if (localStorage.getItem('tick2') === "true" && map[loc][id].tickrate.includes("128")) {
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
    result += "</h3><i class='fas fa-cloud fa-10x'></i><img src='" + map[loc][id].img[0] + "'></img><h3 id='views'>views</h3></div>";
}

function clearPopup() {
    document.getElementById('JSONinfo').innerHTML = "";
    document.getElementById('iframe').innerHTML = "";
    document.getElementById('iframe').src = "";
    document.getElementById('popupPhoto').innerHTML = "<img id='imgSrc'/>";
    document.removeEventListener("keydown", browseImagesKeyEvent);
    document.getElementById('popupPhoto').style.boxShadow = "";
}