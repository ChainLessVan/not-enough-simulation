
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
    resultsContainer.style.display = "none";

    document.getElementById("resultsContainer").style.display = "none";
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
    timeText.textContent = "0s";
    textContainer.style.display = "block";
    resultsContainer.style.display = "none";
    liveTime.style.display = "block";
    liveTime.textContent = "0";
    //keys that wont counts
    const invalidKeys = 'F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Escape Tab CapsLock Shift Control Alt Meta ArrowLeft ArrowRight ArrowDown ArrowUp Enter'.split(' ');
    //the sentence that u type out,im gonna make an array to store multiple
    const text = 'Hello there! I hope your day is going well...';
    //splits the sentence into an array of indiviual letters
    const textArr = text.split('');
    //gives the individual letters an id so can interact with it by colour
    const htmlArr = textArr.map((item, index) => {
        if (item === ' ') {
            return `<span class="space" id="span${index}">${item}</span>`;
        }
        return `<span class="char" id="span${index}">${item}</span>`;
    });

    //after split it combines back into a sentence to print out
    textContainer.innerHTML = htmlArr.join('');

    let errors = [];
    let firstTime = true;
    let currentPos = 0;
    let backspaceNeeded = false;
    let currentTime = 0;
    let repeat;

    //detect typing
    document.addEventListener('keydown', event => {
        if (event.key === ' ') event.preventDefault();

        //starts timer
        if (firstTime) {
            firstTime = false;
            repeat = setInterval(() => {
                currentTime++;
                liveTime.textContent = `${currentTime}s`;
            }   , 1000);       
        }

        //check if key is from main keyboard
        if (event.location === 0 && !invalidKeys.includes(event.key)) {
            handleKey(event.key);
        }
    });

    
    function handleKey(key) {

        //gets the current letter by their span id
        let span = document.getElementById(`span${currentPos}`).style;
        //only allows typing if theres no mistake
        if (!backspaceNeeded) {
            //check key with the letter typed,currentPos is the letter it is on 
            if (key === textArr[currentPos]) {
                span.color = 'green';
                currentPos++;
            } else {

                //makes red space
                if (textArr[currentPos] === ' ') {
                    span.backgroundColor = 'red';
                } else {
                    //makes red letter
                    span.color = 'red';
                }
                
                backspaceNeeded = true;
                //add the char the player got wrong
                errors.push(textArr[currentPos]);
            }
        } else {
            if (event.key === 'Backspace') {
                if (textArr[currentPos] === ' ') {
                    //if the area that was wrong was a space it turns it from red to transparent
                    span.backgroundColor = 'transparent';
                } else {
                    //same thing turns the wrong back from red to black
                    span.color = 'black';
                }
                //allows typing 
                backspaceNeeded = false;
            }
        }
        //checks if the position the letters are at is the same length as the text/string
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

        textContainer.style.display = "none";
        document.getElementById("resultsContainer").style.display = "block" ;
    }
}

const playButton = document.querySelector(".homeButton");
const title = document.querySelector(".title1");

if (playButton && title) {
    playButton.addEventListener("mouseenter", () => {
        title.classList.add("glitch");
    });

    playButton.addEventListener("mouseleave", () => {
        title.classList.remove("glitch");
    });
}
