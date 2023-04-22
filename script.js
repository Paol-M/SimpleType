console.log("%c🔒️ SimpleType respects your privacy\nContribute on GitHub.", "background-color:#cfbcff;color:#3a0092;font-size:4vw;font-family:system-ui;");

const info = document.getElementById("info");
const type = document.getElementById("type");
const minus = document.getElementById("zoomOut");
const plus = document.getElementById("zoomIn");

type.focus();

document.getElementById("zoom").style.display = "flex";

// type.style.rotate = "180deg";

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

// TTS
const tts = document.getElementById("tts");

if ("speechSynthesis" in window) {
  console.log("Broswer supports speech synthesis");
  document.getElementById("tts").addEventListener("click", () => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = document.getElementById("type").value;
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
  });
} else {
  console.log("Browser doesn't support speech synthesis");
  tts.style.display = "none";
}

// PWA
document.addEventListener("DOMContentLoaded", function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then(function (registration) {
        console.log("Service worker registered successfully!");
      })
      .catch(function (error) {
        console.log("Service worker registration failed: ", error);
      });
  }
});