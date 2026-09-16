
//opening stuff
function opengames() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("gameMenu").style.display = "block";
}

function opentyperace() {
    music.pause();
    alert("WARNING: This game may not be suitable for people with epilepsy.")
    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("speedtype").style.display = "block";
}

function returnFromType() {
    document.getElementById("speedtype").style.display = "none";
    document.getElementById("gameMenu").style.display = "block";

        music.play();
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