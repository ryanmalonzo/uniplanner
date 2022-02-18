// Functions

function hasGeoPermission() {
  return new Promise((resolve) => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      resolve(result.state === "granted");
    });
  });
}

function getCurrentPos() {
  return JSON.parse(localStorage.getItem("pos"));
}

function setCurrentPos() {
  navigator.geolocation.getCurrentPosition((position) => {
    const pos = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    localStorage.setItem("pos", JSON.stringify(pos));
    return getCurrentPos();
  });
}

function hasCurrentPos() {
  return getCurrentPos() !== undefined || getCurrentPos() !== null;
}

// Modal

hasGeoPermission().then((granted) => {
  if (!granted) {
    const modal = document.querySelector("#modal");
    modal.classList.add("is-active");
  }
});

document.querySelector("#modal-button").addEventListener("click", () => {
  setCurrentPos();
  modal.classList.remove("is-active");
});

// Map

const pos = hasCurrentPos() ? getCurrentPos() : setCurrentPos();
console.log(pos);

const map = L.map("map").setView([pos.lat, pos.long], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/yusa-ai/ckzsvx2du001e14ngnkdelz1r/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXVzYS1haSIsImEiOiJja3pmeDhyaWQyeGphMnZuOWU3cjFycWoxIn0.y9pV4e0r27XhX--vc6HVxA"
).addTo(map);

// Items

// @https://github.com/pointhi/leaflet-color-markers
let redMarker = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const marker = L.marker([pos.lat, pos.long], { icon: redMarker }).addTo(map);

// let circle = L.circle([51.508, -0.11], {
//   color: "red",
//   fillColor: "#f03",
//   fillOpacity: 0.5,
//   radius: 500,
// }).addTo(map);

// let polygon = L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047],
// ]).addTo(map);

// // Popups

marker.bindPopup("<p>Vous êtes ici !</p>").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

// // Auto-closing popup
// // var popup = L.popup()
// //   .setLatLng([51.513, -0.09])
// //   .setContent("I am a standalone popup.")
// //   .openOn(map);

// // Events

// let popup = L.popup();

// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(map);
// }

// map.on("click", onMapClick);
