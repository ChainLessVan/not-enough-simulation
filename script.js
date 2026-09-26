let userInGame = false

//opening stuff
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));    
    }
function opengames() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("gameMenu").style.display = "block";
    userInGame = true
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
    document.getElementById("main_menu").style.display = "block";
    userInGame = false
}

//music stuff
const musicChanger = document.querySelector(".musicToggle")
//music and sfx
const music = document.getElementById("MainMusic");
const explosionSFX = document.getElementById("Explosion")
const unlock = document.getElementById("UnlockingSound")
const TouchGrassSfx = document.getElementById("TouchGrass")
const goodJobVoice = document.getElementById("goodjob")
const YouGotMail = document.getElementById("Mail")
const Countdown = document.getElementById("Countdown")
const JumpscareSFX = document.getElementById("JumpscareSFX")
const Sounds = [music,explosionSFX,unlock,TouchGrassSfx,goodJobVoice,Countdown];
//this is to refresh the sounds so sounds can be heard used in line 78
let Audios = false;
music.volume = 0.5;
music.play()

let vol = 0.5;
let lastvol = 0.5;
const volumeSlider = document.getElementById("volumeControl");

//links all the sounds and allows to mute/unmute all at the same time
volumeSlider.addEventListener("input",() => {
     vol = volumeSlider.value/100;
    lastvol = vol;
    Sounds.forEach(sound => {
        sound.volume = vol;
    })
})

function musicChange() {
    if (Sounds[0].volume > 0) {
        lastvol = vol;
        Sounds.forEach(sound => sound.volume = 0);
        musicChanger.src = "images/volumeOff.png"
    } else {
        vol = lastvol;
        Sounds.forEach(sound => sound.volume = vol)
        musicChanger.src = "images/volumeOn.png"
        }
    }   
    volumeSlider.value = vol*100;



function returnFromType() {
    document.removeEventListener('keydown',keylistener);
    document.getElementById("game").style.display = "none";
    document.getElementById("gameMenu").style.display = "block";

    music.play();


    document.getElementById("resultsContainer").style.display = "none";
}

const Jumpscare =document.getElementById("TungTung")
let lost = false;

//perma checks if lost = true then does smth later ill add
setInterval(() => {
    if (lost) {
        document.getElementById("GameContent").style.display = "none";
        JumpscareSFX.play()
        Jumpscare.style.display = "block";
        lost = false;
    }
},100)
const distract1 = [];
function opentyperace() {
    music.pause();
    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("game").style.display = "block";
    Jumpscare.style.display = "none";
    distract1.push(document.getElementById("BOMB"));
    for (let i = 0; i < distract1.length; i++){
        distract1[i].style.display = "none";
    }
    if (!Audios) {
        unlock.play().catch(() => {});
        Audios = true;
    }
    
    startTypingGame();
    
}
//lost check for grass
let grasstouch = false;
let TouchGrass = false;
document.getElementById("grassButton").addEventListener("click",()=> {
    if (TouchGrass === true) {
        Countdown.currentTime = 0
        grasstouch = true;
        Countdown.pause()
        goodJobVoice.play()
    }
})

//lost check for grass + emails
async function countdown() {
    await wait(1000);
    Countdown.play()
    await wait(10000)
    if (TouchGrass && !grasstouch) {
        console.log("grassLost")
        lost = true;
    }
}

//the emails
function startCountdown(id) {
    let count = 40;
    myDisplayer(count, id);
    
    activeTimers[id] = setInterval(function(){
        count--;
        myDisplayer(count, id);

    if (count === 0) {
        lost = true;
        clearInterval(activeTimers[id]);
        delete activeTimers[id]
        myDisplayer("Donnne");
    }
    }, 1000)
}

function myDisplayer(text, id) {
    const elementId = document.getElementById(id);
    elementId.innerHTML = text;
}

//this will be the new text game

function getRandomInt(max) {
    return Math.floor(Math.random()*max);
}
let keylistener;
function startTypingGame() {
    //flashing typing line
    const Typingline = document.getElementById("Typingline");
    Typingline.style.display = "block";
    const textContainer = document.getElementById("textContainer")
    timeText.textContent = "0s";
    textContainer.style.display = "block";
    resultsContainer.style.display = "none";
    liveTime.style.display = "block";
    liveTime.textContent = "0";
    //keys that wont counts
    const invalidKeys = 'F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Escape Tab CapsLock Shift Control Alt Meta ArrowLeft ArrowRight ArrowDown ArrowUp Enter'.split(' ');
    //the sentence that u type out,im gonna make an array to store multiple
    const textsentenceArr = ["Hello there! My name is verity,Im your personal assistent","This is a test","if your power is triple T"];
    const text = textsentenceArr[getRandomInt(textsentenceArr.length)];
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
    textContainer.appendChild(Typingline);
    let errors = [];
    let firstTime = true;
    let currentPos = 0;
    let backspaceNeeded = false;
    let currentTime = 0;
    let repeat;


    //detect typing
    keylistener = function(event) {
        if (event.key === ' ') event.preventDefault();
        //checks for distractions
            if (currentPos === Math.floor(textArr.length/5)) {
                for (let i = 0; i < distract1.length; i++){
                    distract1[i].style.display = "block";
                }
                explosionSFX.play();
            } else if (currentPos === Math.floor(textArr.length/3)) {
                TouchGrass = true
                TouchGrassSfx.play()
                countdown()
            }
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
    };

    document.addEventListener('keydown',keylistener);
    
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
            if (key === 'Backspace') {
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
        document.removeEventListener('keydown',keylistener);
        let wpm = Math.floor(textArr.length / 5 / (currentTime / 60));
        let accuracy = Math.floor(((textArr.length - errors.length) / textArr.length) * 100);
        let minutes = Math.floor(currentTime / 60);
        let seconds = currentTime - minutes * 60;
        let mistakes = errors.length;

        wpmText.innerHTML = `your wpm is ${wpm} wpm`;
        accuracyText.innerHTML = `your accuracy is ${accuracy}%`;
        timeText.innerHTML = `You took ${minutes} m and ${seconds} s`;
        mistakeText.innerHTML = `You made ${mistakes} mistakes`;
       
        

        textContainer.style.display = "none";
        resultsContainer.style.display = "block" ;
        for (let i = 0; i < distract1.length; i++){
            distract1[i].style.display = "none";
        }
    }
}


// make text glitchy
const trigger = document.querySelector(".homeButton");
const targets = document.querySelectorAll(".target");
const title = document.querySelector(".title1")
const scrollingText = document.querySelectorAll(".scrollText")
trigger.addEventListener("mouseenter", () => {
    title.classList.add("glitch");
    targets.forEach(el => {
        el.style.opacity = "1";
    })
    targets.forEach(el => el.classList.add("glitch"));
        scrollingText.forEach(el => {
        el.style.display = "block";
})});
trigger.addEventListener("mouseleave", () => {
    title.classList.remove("glitch")
    targets.forEach(el => el.classList.remove("glitch"));
    targets.forEach(el => {
        el.style.opacity = "0";
    })
        scrollingText.forEach(el => {
        el.style.display = "none";
})});


//  INBOX!!!!!!!!
let gotMail = false;
let numberOfMail = 0;
//i moved lost variable to the start
function getMail() {
    const mailBox = document.getElementById("mailBox")
    const mailTaskArr = ["Type one letter", "This is not a test", "Jonah was not here"];
    const mail = mailTaskArr[getRandomInt(mailTaskArr.length)];
    mailBox.style.display = "block";
    
    if (numberOfMail == 0) {
        mailText1.innerHTML += mail;
        mailFrame1.style.display = "block";
    } else if (numberOfMail == 1) {
        mailText2.innerHTML += mail; // caht am I cooooookeed
        mailFrame2.style.display = "block";
    } else if (numberOfMail == 2) {
        
        mailText3.innerHTML += mail;
        mailFrame3.style.display = "block";
    } else if (numberOfMail == 3) {
        mailText4.innerHTML += mail;
        mailFrame4.style.display = "block";
    } else if (numberOfMail == 4) {
        mailText5.innerHTML += mail;
        mailFrame5.style.display = "block";
    } else if (numberOfMail == 5) {
        mailText6.innerHTML += mail;
        mailFrame6.style.display = "block";
    } else if (numberOfMail == 6) {
        mailText7.innerHTML += mail;
        mailFrame7.style.display = "block";
    }
    numberOfMail = numberOfMail + 1;
    if (numberOfMail > 7) {
        console.log("maillost")
        lost = true;
    }
}

//every sec gameble for mail
if (userInGame) {
    setInterval (() => {
        if (getRandomInt(5) === 1){
            getMail()
        }
    }, 2000);
}
