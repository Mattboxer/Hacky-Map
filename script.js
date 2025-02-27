import { db, storage } from "./firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGJveGVyIiwiYSI6ImNtN243OHBwejBxdTMycnM2dnh3a3doNXQifQ.GLcO8FmRNXle5JVx18VaVQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-79.3832, 43.6532], // Toronto
    zoom: 10
});

// 📍 Load all hacky spots from Firebase
async function loadHackySpots() {
    const querySnapshot = await getDocs(collection(db, "hackySpots"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        addMarker(data);
    });
}

// 📌 Add a marker to the map
function addMarker(data) {
    const marker = new mapboxgl.Marker()
        .setLngLat([data.lng, data.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${data.name}</h3><img src="${data.photo}" width="100%">`))
        .addTo(map);
}

// 🎯 Add a Hacky Spot
async function addHackySpot() {
    const name = document.getElementById("locationName").value;
    const file = document.getElementById("photoInput").files[0];

    if (!name || !file) {
        alert("Please enter a location name and upload a photo.");
        return;
    }

    // 📍 Get user's clicked location on the map
    map.once("click", async (e) => {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;

        // 📸 Upload Photo to Firebase Storage
        const storageRef = ref(storage, `photos/${file.name}`);
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);

        // 🔥 Save to Firebase Firestore
        const docRef = await addDoc(collection(db, "hackySpots"), {
            name,
            lng,
            lat,
            photo: photoURL
        });

        // ✅ Add marker to map instantly
        addMarker({ name, lng, lat, photo: photoURL });

        alert("Hacky Spot added!");
    });

    alert("Click on the map to place your Hacky Spot!");
}

// 🚀 Load existing spots when page loads
loadHackySpots();
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").addEventListener("click", addHackySpot);
});

function addHackySpot() {
    alert("Button clicked! Implement Firebase upload here.");
}
