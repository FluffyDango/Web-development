"use strict";

let smokeIconDiv = document.getElementById('smokeIconHolder');
let map;

function getIconData() {
    fetch("../JSON/smokeIcons.json")
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            // object galima įeiti ne tik su .type bet ir [type]
            if (localStorage.getItem('currentMap') === "mirage")
                map = data.mirage[localStorage.getItem("typeActive")];
            else if (localStorage.getItem('currentMap') === "inferno")
                map = data.inferno[localStorage.getItem("typeActive")];
            loadIcons();
        });
}

function loadIcons() {
    smokeIconDiv.innerHTML = "";
    let result = "";

    if (localStorage.getItem("typeActive") === "smoke") {
        for (let i = 0; i < Object.keys(map.top).length; i++) {
            result += "<div class='fas fa-cloud fa-2x smokeIcon' style='color: #d6d6d6; top: " + map.top[i] + "%" + ";left: " + map.left[i] + "%" + ";' onclick='showPopup(); getData(&quot;" + i + "&quot;)'></div>";
        }
    }
    else if (localStorage.getItem("typeActive") === "molotov") {
        for (let i = 0; i < Object.keys(map.top).length; i++) {
            result += "<div class='fas fa-fire fa-2x smokeIcon' style='color: #e02d0d; top: " + map.top[i] + "%" + ";left: " + map.left[i] + "%" + ";' onclick='showPopup(); getData(&quot;" + i + "&quot;)'></div>";
        }
    }
    else if (localStorage.getItem("typeActive") === "flash") {
        for (let i = 0; i < Object.keys(map.top).length; i++) {
            result += "<div class='fas fa-bolt fa-2x smokeIcon' style='color: #eecf20; top: " + map.top[i] + "%" + ";left: " + map.left[i] + "%" + ";' onclick='showPopup(); getData(&quot;" + i + "&quot;)'></div>";
        }
    }
    else {
        for (let i = 0; i < Object.keys(map.top).length; i++) {
            result += "<div class='fas fa-bomb fa-2x smokeIcon' style='color: #000000; top: " + map.top[i] + "%" + ";left: " + map.left[i] + "%" + ";' onclick='showPopup(); getData(&quot;" + i + "&quot;)'></div>";
        }
    }

    smokeIconDiv.innerHTML = result;
}