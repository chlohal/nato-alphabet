/** @type {string[]} */
let WORDS = window.WORDS;

let NATO_ALPHABET = window.NATO_ALPHABET;

let display = document.querySelector(".word-display");
let wordEntry = document.querySelector(".word-entry");

function displayNextWord() {
    let word = WORDS[Math.floor(Math.random() * WORDS.length)];

    let currentLetter = 0;

    let focused = document.createElement("span");
    focused.classList.add("word-focused-letter");

    let yetToCome = document.createElement("span");
    yetToCome.classList.add("word-yet-to-come");

    display.appendChild(focused);
    display.appendChild(yetToCome);

    updateLetters();

    function inputHandler(e) {
        checkGuess();
    }
    wordEntry.addEventListener("input", inputHandler);

    function checkGuess() {
        let wanted = NATO_ALPHABET[word[currentLetter]];
        let had = wordEntry.value.replace(/\W/g, "");

        if(wanted.startsWith(had) && wanted != had) {
            return undefined;
        }

        let lastLetter = document.createElement("span");
        lastLetter.textContent = word[currentLetter];
        display.insertBefore(lastLetter, focused);

        if (had == wanted) {
            lastLetter.classList.add("word-success-letter");
        } else {
            lastLetter.classList.add("word-error-letter");
        }

        let indicator = document.createElement("span");
        indicator.textContent = wanted;
        lastLetter.appendChild(indicator);

        currentLetter++;
        wordEntry.value = "";

        if (currentLetter == word.length) {
            wordEntry.removeEventListener("input", inputHandler);
            display.textContent = "";
            displayNextWord();
        } else {
            updateLetters();
        }
    }

    function updateLetters() {
        focused.textContent = word[currentLetter];
        yetToCome.textContent = word.substring(currentLetter + 1);
    }
}

displayNextWord();
