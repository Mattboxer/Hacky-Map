document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("addSpotButton");

    if (button) {
        console.log("Button found! Adding event listener.");
        button.addEventListener("click", addHackySpot);
    } else {
        console.error("Button NOT found!");
    }
});

function addHackySpot() {
    alert("Button clicked! Implement Firebase upload here.");
}
