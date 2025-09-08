const morseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  " ": "/",
};

const reverseMorseCodeMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([key, value]) => [value, key])
);

function translateToMorse(text) {
  return text
    .toUpperCase()
    .split("")
    .map((char) => morseCodeMap[char] || "")
    .join(" ");
}

function translateFromMorse(morseCode) {
  return morseCode
    .split(" ")
    .map((code) => reverseMorseCodeMap[code] || "")
    .join("");
}

const form = document.getElementById("form");
const textInput = document.getElementById("text");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultCard = document.getElementById("resultCard");
const resultText = document.getElementById("resultText");
const swapBtn = document.getElementById("swapBtn");

// Event Listener for the Swap Button
swapBtn.addEventListener("click", function () {
  const fromValue = fromSelect.value;
  const toValue = toSelect.value;
  fromSelect.value = toValue;
  toSelect.value = fromValue;
});

// Event Listener for Auto-Detection
textInput.addEventListener("input", function () {
  const inputValue = textInput.value;
  const isMorse = /^[.\-/\s]*$/.test(inputValue);

  if (isMorse && fromSelect.value !== "morse") {
    fromSelect.value = "morse";
    toSelect.value = "latin";
  } else if (!isMorse && fromSelect.value !== "latin") {
    fromSelect.value = "latin";
    toSelect.value = "morse";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = textInput.value;
  const from = fromSelect.value;
  const to = toSelect.value;
  let result = "";

  if (from === "latin" && to === "morse") {
    result = translateToMorse(text);
  } else if (from === "morse" && to === "latin") {
    result = translateFromMorse(text);
  } else {
    result = "Pilihan tidak valid."; // Invalid selection message
  }

  resultText.textContent = result;
  resultCard.classList.remove("hidden");
});