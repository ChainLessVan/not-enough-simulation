
function opengame() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    document.getElementById("gameArea").innerHTML = `
    <h2>this is game </h2>
    <p> just test </p>
    `;
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