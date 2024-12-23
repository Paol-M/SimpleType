// Code based on Alfaaz until otherwise noted (around line 45), https://github.com/thecodrr/alfaaz, MIT License (https://github.com/thecodrr/alfaaz?tab=MIT-1-ov-file#readme)
const CHINESE_MAX_CODE_POINT = 205743;
const CHINESE_MIN_CODE_POINT = 11904;
const BYTE_SIZE = 8;
const BITMAP = new Uint8Array(CHINESE_MAX_CODE_POINT / BYTE_SIZE + 1);
function insertCharsIntoMap(...chars) {
    for (const char of chars) {
        const charCode = char.charCodeAt(0);
        const byteIndex = Math.floor(charCode / BYTE_SIZE);
        const bitIndex = charCode % BYTE_SIZE;
        BITMAP[byteIndex] = BITMAP[byteIndex] ^ (1 << bitIndex);
    }
}
function insertRangeIntoMap(from, to) {
    for (let i = from / BYTE_SIZE; i < Math.ceil(to / BYTE_SIZE); i++) {
        BITMAP[i] = 0b11111111;
    }
}
const NEWLINE = "\n";
insertCharsIntoMap(" ", "\n", "\t", "\v", "*", "/", "&", ":", ";", ".", ",", "?", "=", "\u0F0B", "\u1361", "\u200b");

function countWords(str) {
    let count = 0;
    let shouldCount = false;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        const byteIndex = Math.floor(charCode / BYTE_SIZE);
        const bitIndex = charCode % BYTE_SIZE;
        const byteAtIndex = BITMAP[byteIndex];
        const isMatch = ((byteAtIndex >> bitIndex) & 1) === 1;
        count += isMatch && (shouldCount || byteAtIndex === 255);
        shouldCount = !isMatch;
    }
    count += shouldCount;
    return count;
}

function countLines(str) {
    let count = 0;
    for (let i = -1; (i = str.indexOf(NEWLINE, ++i)) !== -1 && i < str.length; count++)
        ;
    count++;
    return count;
}
// The code above is based of Alfaaz.

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
  if (lineMode) {
    let count = countLines(textContent);
    sCount.textContent = count.toLocaleString() + " line" + (count === 1 ? "" : "s");
  } else {
    let count = countWords(textContent);
    wCount.textContent = count.toLocaleString() + " word" + (count === 1 ? "" : "s");
  }
}

// function countSelection() {
//   let selection = window.getSelection();
//   let textContent = selection.toString();
//   if (lineMode) {
//     let count = countLines(textContent);
//     sCount.textContent = count.toLocaleString() + " line" + (count === 1 ? "" : "s");
//   } else {
//     let count = countWords(textContent);
//     wCount.textContent = count.toLocaleString() + " word" + (count === 1 ? "" : "s");
//   }
// }

type.addEventListener("input", updateCount);
clearText.addEventListener("click", updateCount);