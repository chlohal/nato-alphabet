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

    wordEntry.addEventListener("keydown", function keyHandler(e) {
        if(e.code == "Space" || e.code == "Enter") {
            e.preventDefault();

            let wanted = NATO_ALPHABET[word[currentLetter]];

            let lastLetter = document.createElement("span");
            lastLetter.textContent = word[currentLetter];
            display.insertBefore(lastLetter, focused);

            if(wordEntry.value.replace(/\W/g, "") == wanted) {
                lastLetter.classList.add("word-success-letter");
            } else {
                lastLetter.classList.add("word-error-letter");
            }

            let indicator = document.createElement("span");
            indicator.textContent = wanted;
            lastLetter.appendChild(indicator);

            currentLetter++;
            wordEntry.value = "";

            if(currentLetter == word.length) {
                wordEntry.removeEventListener("keydown", keyHandler);
                display.textContent = "";
                displayNextWord();
            } else {
                updateLetters();
            }
        }
    })


    function updateLetters() {
        focused.textContent = word[currentLetter];
        yetToCome.textContent = word.substring(currentLetter + 1);
    }
}


displayNextWord();