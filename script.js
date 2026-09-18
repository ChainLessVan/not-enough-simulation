
//opening stuff
function opengames() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("gameMenu").style.display = "block";
}

function opensettings() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("settings").style.display = "block";
}


//going back on stuff
function returnFromSettings() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("main_menu").style.display = "block";
}

function back1() {
    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("main_menu").style.display = "block"
}

//music stuff
const music = document.getElementById("MainMusic");
music.volume = 0.5;
music.play()

const volumeSlider = document.getElementById("volumeControl");

volumeSlider.addEventListener("input",() => {
    music.volume =volumeSlider.value/100;
})

function returnFromType() {
    document.getElementById("speedtype").style.display = "none";
    document.getElementById("gameMenu").style.display = "block";

    music.play();

    textContainer.innerHTML = "";
    resultsContainer.sytle.display = "none";
}



function opentyperace() {
    music.pause();
    alert("WARNING: This game may not be suitable for people with epilepsy.")
    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("speedtype").style.display = "block";

    startTypingGame();
}






//this will be the new text game
function startTypingGame() {
    const invalidKeys = 'F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Escape Tab CapsLock Shift Control Alt Meta ArrowLeft ArrowRight ArrowDown ArrowUp Enter'.split(' ');

    const text = 'Hello there! I hope your day is going well...';

    const textArr = text.split('');
    const htmlArr = textArr.map((item, index) => {
        if (item === ' ') {
            return `<span class="space" id="span${index}">${item}</span>`;
        }
        return `<span class="char" id="span${index}">${item}</span>`;
    });

    textContainer.innerHTML = htmlArr.join('');

    let errors = [];
    let firstTime = true;
    let currentPos = 0;
    let backspaceNeeded = false;
    let currentTime = 0;
    let repeat;

    document.addEventListener('keydown', event => {
        if (event.key === ' ') event.preventDefault();

        if (firstTime) {
            firstTime = false;
            repeat = setInterval(() => currentTime++, 1000);
        }

        if (event.location === 0 && !invalidKeys.includes(event.key)) {
            handleKey(event.key);
        }
    });

    function handleKey(key) {
        let span = document.getElementById(`span${currentPos}`).style;

        if (!backspaceNeeded) {
            if (key === textArr[currentPos]) {
                span.color = 'green';
                currentPos++;
            } else {
                if (textArr[currentPos] === ' ') {
                    span.backgroundColor = 'red';
                } else {
                    span.color = 'red';
                }
                backspaceNeeded = true;
                errors.push(textArr[currentPos]);
            }
        } else {
            if (event.key === 'Backspace') {
                if (textArr[currentPos] === ' ') {
                    span.backgroundColor = 'transparent';
                } else {
                    span.color = 'black';
                }
                backspaceNeeded = false;
            }
        }

        if (currentPos === textArr.length) {
            clearInterval(repeat);
            handleEnd();
        }
    }

    function handleEnd() {
        let wpm = Math.floor(textArr.length / 5 / (currentTime / 60));
        let accuracy = Math.floor(((textArr.length - errors.length) / textArr.length) * 100);
        let minutes = Math.floor(currentTime / 60);
        let seconds = currentTime - minutes * 60;

        wpmText.innerHTML = `${wpm} wpm`;
        accuracyText.innerHTML = `${accuracy}%`;
        timeText.innerHTML = `${minutes} m ${seconds} s`;

        main.style.display = 'none';
        resultsContainer.style.display = 'block';
    }
}
