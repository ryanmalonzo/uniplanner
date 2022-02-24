import { hasCurrentPos, getCurrentPos, setCurrentPos } from "./map.js";

// Map

// TODO refresh first time or delay load
const pos = hasCurrentPos() ? getCurrentPos() : setCurrentPos();

const map = L.map("map", { minZoom: 13 }).setView([pos.lat, pos.long], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/yusa-ai/ckzsvx2du001e14ngnkdelz1r/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXVzYS1haSIsImEiOiJja3pmeDhyaWQyeGphMnZuOWU3cjFycWoxIn0.y9pV4e0r27XhX--vc6HVxA"
).addTo(map);

console.log(map.zoomControl);
map.zoomControl.setPosition("bottomright");

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

//const markerIUT = L.marker([48.842, 2.2679]).addTo(map);

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

const onMapClick = (e) => {
  const { lat, lng } = e.latlng;
  const marker = L.marker([lat, lng], { icon: redMarker }).addTo(map);
  marker.on("contextmenu", () => {
    map.removeLayer(marker);
  });
};

map.on("click", onMapClick);
map.on("contextmenu", () => {}); // disable browser context menu
