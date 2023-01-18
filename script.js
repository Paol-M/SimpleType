console.log("%c🔒️ SimpleType is private\nContribute on GitHub.", "background-color:#cfbcff;color:#3a0092;font-size:4vw;font-family:system-ui;");

const info = document.getElementById("info");
const type = document.getElementById("type");
const minus = document.getElementById("-");
const plus = document.getElementById("+");

info.checked = false;
type.focus();

document.getElementById("-+").style.display = "flex";

type.onclick = closeMenu;
function closeMenu() {
  info.checked = false;
}

document.addEventListener("keyup", (evt) => {
  if (evt.key == "Escape") {
    info.checked = false;
    type.focus();
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

minus.onclick = minusSize;
function minusSize() {
  var x = window.getComputedStyle(type).fontSize;
  var y = x.replace("px", "");
  let z = +y;

  if (z > 10) {
    type.style.fontSize = y * 0.9 + "px";

    plus.style.fillOpacity = 1;
    plus.style.cursor = "pointer";

    minus.style.fillOpacity = 1;
    minus.style.cursor = "pointer";
  } else {
    minus.style.fillOpacity = 0.5;
    minus.style.cursor = "not-allowed";
  }
}

plus.onclick = addSize;
function addSize() {
  var x = window.getComputedStyle(type).fontSize;
  var y = x.replace("px", "");
  let z = +y;
  console.log(isFinite(z));

  if (z < 200) {
    type.style.fontSize = z * 1.1 + "px";

    plus.style.fillOpacity = 1;
    plus.style.cursor = "pointer";

    minus.style.fillOpacity = 1;
    minus.style.cursor = "pointer";
  } else {
    plus.style.fillOpacity = 0.5;
    plus.style.cursor = "not-allowed";
  }
}

// PWA
window.onload = () => {
"use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
};