"use strict";

let mapIcons;
let map;

function getIconData() {
    mapIcons = ICONdata[localStorage.getItem('currentMap')][localStorage.getItem("typeActive")];
    map = JSONdata[localStorage.getItem('currentMap')][localStorage.getItem('typeActive')];

    SMOKEICONHOLDER.innerHTML = "";
    let result = "";
    let typeOfNade = "";
    let count = 0;
    let tickNumber;

    if (localStorage.getItem("typeActive") === "smoke")
        typeOfNade = "<div class='fas fa-cloud fa-2x smokeIcon' style='color: #d6d6d6; ";
    else if (localStorage.getItem("typeActive") === "molotov")
        typeOfNade = "<div class='fas fa-fire fa-2x smokeIcon' style='color: #e02d0d; ";
    else if (localStorage.getItem("typeActive") === "flash")
        typeOfNade = "<div class='fas fa-bolt fa-2x smokeIcon' style='color: #eecf20; ";
    else 
        typeOfNade = "<div class='fas fa-bomb fa-2x smokeIcon' style='color: #000000; ";

    if (localStorage.getItem('tickActiveID') === "tick1")
        tickNumber = "64";
    else 
        tickNumber = "128";

    for (let i = 0; i < Object.keys(mapIcons.top).length; i++) {
        for (let j=1; j < Object.keys(map[i]).length; j++) {
            if (map[i][j].tickrate.includes(tickNumber))
                count++;
        }
        if (count > 0) {
            result += typeOfNade + "top: " + mapIcons.top[i] + "%" + ";left: " + mapIcons.left[i] + "%" + ";' onclick='showPopup(); getData(&quot;" + i + "&quot;)'><span class='nadeCount'>" + count + "</span></div>";
        }
        count = 0;
    }

    SMOKEICONHOLDER.innerHTML = result;
}