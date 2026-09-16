
//opening stuff
function opengames() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("gameMenu").style.display = "block";
}

function opentyperace() {
    alert("WARNING: This game may not be suitable for people with epilepsy.")
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
}

function opensettings() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("settings").style.display = "block";


    fetch("settings.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("settings").innerHTML = html;

            document.getElementById("SettingsToMain").addEventListener("click", () => {
                document.getElementById("settings").style.display = "none";
                document.getElementById("main_menu").style.display = "block";
                console.log("Back to main menu from settings");
            });
        });
}

//going back on stuff
function back1() {
    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("main_menu").style.display = "block"
}
