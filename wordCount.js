import { countWords, countLines } from './node_modules/alfaaz/dist/index.js';

const wCount = document.getElementById("wCount");
const sCount = document.getElementById("sCount");
const count = document.getElementById("count");
const type = document.getElementById("type");
const clearText = document.getElementById('clearText');

let lineMode = false;


count.style.display = "flex";

count.onclick = function () {
  if (lineMode) {
    lineMode = false;
    sCount.style.display = "none";
    wCount.style.display = "flex";
  } else {
    lineMode = true;
    wCount.style.display = "none";
    sCount.style.display = "flex";
  }
  updateCount();
}

function updateCount() {
  let textContent = type.value;
  let count = lineMode ? countLines(textContent) : countWords(textContent);
  if (lineMode) {
    sCount.textContent = count.toLocaleString() + " line" + (count === 1 ? "" : "s");
  } else {
    wCount.textContent = count.toLocaleString() + " word" + (count === 1 ? "" : "s");
  }
}

export function countSelection() {
  let selection = window.getSelection();
  let textContent = selection.toString();
  let count = lineMode ? countLines(textContent) : countWords(textContent);
  if (lineMode) {
    sCount.textContent = count.toLocaleString() + " line" + (count === 1 ? "" : "s");
  } else {
    wCount.textContent = count.toLocaleString() + " word" + (count === 1 ? "" : "s");
  }
}

type.addEventListener("input", updateCount);
clearText.addEventListener("click", updateCount);