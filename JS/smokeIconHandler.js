"use strict";

let map;

function getIconData() {
    let typeActive = localStorage.getItem("typeActive");
    fetch("../JSON/smokeIcons.json")
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            // object galima įeiti ne tik su .type bet ir [type]
            switch (localStorage.getItem('currentMap')) {
                case "mirage":
                    map = data.mirage[typeActive];
                    break;
                case "inferno":
                    map = data.inferno[typeActive];
                    break;
                case "overpass":
                    map = data.overpass[typeActive];
                    break;
                case "dust2":
                    map = data.dust2[typeActive];
                    break;
                case "cache":
                    map = data.cache[typeActive];
                    break;
                case "train":
                    map = data.train[typeActive];
                    break;
                case "nuke":
                    map = data.nuke[typeActive];
                    break;
                case "vertigo":
                    map = data.vertigo[typeActive];
                    break;
                default:
                    map = data.mirage[typeActive];
                    break;
            }
            loadIcons();
        });
}

function loadIcons() {
    SMOKEICONHOLDER.innerHTML = "";
    let result = "";
    let typeOfSmoke = "";

    if (localStorage.getItem("typeActive") === "smoke")
        typeOfSmoke = "<div class='fas fa-cloud fa-2x smokeIcon' style='color: #d6d6d6; ";
    else if (localStorage.getItem("typeActive") === "molotov")
        typeOfSmoke = "<div class='fas fa-fire fa-2x smokeIcon' style='color: #e02d0d; ";
    else if (localStorage.getItem("typeActive") === "flash")
        typeOfSmoke = "<div class='fas fa-bolt fa-2x smokeIcon' style='color: #eecf20; ";
    else 
        typeOfSmoke = "<div class='fas fa-bomb fa-2x smokeIcon' style='color: #000000; ";

    for (let i = 0; i < Object.keys(map.top).length; i++) {
        result += typeOfSmoke + "top: " + map.top[i] + "%" + ";left: " + map.left[i] + "%" + ";' onclick='showPopup(); getData(&quot;" + i + "&quot;)'></div>";
    }

    SMOKEICONHOLDER.innerHTML = result;
}