document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");
    
    const button = document.getElementById("addSpotButton");

    if (button) {
        console.log("Button found! Adding event listener.");
        button.addEventListener("click", addHackySpot);
    } else {
        console.error("Button NOT found! Check the ID in index.html.");
    }
});

function addHackySpot() {
    alert("Button clicked! Implement Firebase upload here.");
}
