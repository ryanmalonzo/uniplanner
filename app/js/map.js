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
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoieXVzYS1haSIsImEiOiJja3pmeGFqNjMyeHh0Mm5ueHQ3cGluZ2x6In0.IpP_cmzbsWc8GoqNaurLLg",
  }
).addTo(map);

// Items

const marker = L.marker([pos.lat, pos.long]).addTo(map);

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

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
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
