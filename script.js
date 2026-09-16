
//opening stuff
function opengames() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("gameMenu").style.display = "block";
}



function opensettings() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("settings").style.display = "block";
}

function returnFromSettings() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("main_menu").style.display = "block";
}


//going back on stuff
function back1() {
    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("main_menu").style.display = "block"
}

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
}


const words = [
    "digital", "simulation", "keyboard", "speed", "future",
    "typing", "glitch", "system", "memory", "screen"
];

let currentWord = ""
let score = 0
let timeLeft = 10;
let timerInterval;

function opentyperace() {
    music.pause();
    alert("WARNING: This game may not be suitable for people with epilepsy.")
    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("speedtype").style.display = "block";

    startSpeedtype();
}

function startSpeedtype() {
    score = 0;
    timeLeft = 10;
    clearInterval(timerInterval);

    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("timer").textContent = "Time: " + timeLeft;

    newWord();

    //This is the timer that drops per sec so you can add flashy stuff 
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = "Time: " + timeLeft;

        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);

    document.getElementById("typeInput").value = "";
    document.getElementById("typeInput").focus();

document.getElementById("typeInput").addEventListener("input",checkWord);
}

function newWord() {
    currentWord = words[Math.floor(Math.random()* words.length)];
    document.getElementById("wordToType").textContent = currentWord

}

function checkWord () {
    const typed = document.getElementById("typeInput").value;

    if(typed === currentWord) {
        score++;
        document.getElementById("score").textContent = "Score: " + score;

        document.getElementById("typeInput").value = "";
        newWord();
    }

}

function endGame() {
    alert("Thats all your time! your score is......" + score)
    returnFromType();
}