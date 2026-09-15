
function opengame() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    fetch("Game.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("gameArea").innerHTML = html;

            document.getElementById("SettingsToMain").addEventListener("click", () => {
                console.log("Back to main menu from settings");
            });
        });
}

function opensettings() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("settings").style.display = "block";

    document.getElementById("settings").innerHTML = `
    <h2>this is settings </h2>
    <p> just test </p>
    `;
}