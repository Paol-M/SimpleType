const wCount = document.getElementById("wCount");
const type = document.getElementById("type");

function updateCount() {
  var text = type.value.trim();
  if (typeof text === "string" && text.length > 0) {
    let start = type.selectionStart;
    let end = type.selectionEnd;
    if (start === end) {
      start = 0;
      end = text.length;
    }

    let selectedText = text.slice(start, end);
    let count = selectedText.split(/\s/).filter((word) => word !== "").length;

    let realStart = type.selectionStart;
    let realEnd = type.selectionEnd;

    if (count === 1) {
      if (realStart === realEnd) {
        wCount.textContent = count + " word";
      } else {
        wCount.textContent = count + " word selected";
      }
    } else {
      if (realStart === realEnd) {
        wCount.textContent = count + " words";
      } else {
        wCount.textContent = count + " words selected";
      }
    }
  }
}

type.addEventListener("input", updateCount);
type.addEventListener("selectionchange", updateCount);
type.addEventListener("click", updateCount);

// updateCount();
