"use strict";

function getDataImg(loc, id) {
    fetch("../JSON/smokeInfo.json")
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            JSONdata = data;
            if (localStorage.getItem('currentMap') === "mirage"){
                map = JSONdata.mirage[localStorage.getItem('typeActive')];
            }
            else if (localStorage.getItem('currentMap') === "inferno") {
                map = JSONdata.inferno[localStorage.getItem('typeActive')];
            }
            images = map[loc][id].img;
            instructions = map[loc][id].thrdesc;

            document.getElementById('smokeTitle').innerHTML = map[loc].title + " " + localStorage.getItem('typeActive');
            document.getElementById('imgSrc').src = images[0];
            IMGBACKICON.style.visibility = "visible";
            PHOTOVIDEOBTN.style.visibility = "visible";
            PHOTOVIDEOBTN.setAttribute("onclick", "playVideo(" + loc + "," + id + ")");
            document.getElementById('smokeShare').setAttribute("onclick", "shareSmoke(" + "'" + localStorage.getItem('currentMap') + "'" + "," + loc + "," + id + ")");
            SMOKESHAREBTN.style.visibility = "visible";
            IMGBACKICON.setAttribute("onclick", "backPage(" + loc + ");");

            // įdeda rodyklytes
            document.getElementById('popupPhoto').innerHTML += "<a class='fas fa-caret-left imgPrev' id='nextImg' onclick='previousImage()'></a><a class='fas fa-caret-right imgNext' id='prevImg' onclick='nextImage()'></a><div class='smokeDescription'><p class='smokeInstructions' id='smokeInstructions'><p></div>";

            // vaikščiojimas per nuotraukas su klaviatūros rodyklytem
            document.addEventListener("keydown", browseImagesKeyEvent);

            document.getElementById('popupPhoto').style.boxShadow = "1px 1px 20px 1px black";

            // kad neliktu box, kai paspaudi
            document.getElementById('JSONinfo').innerHTML = "";
            
            // instrukcijos
            document.getElementById('smokeInstructions').innerHTML = instructions[0];
        });
}