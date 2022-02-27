import { hasCurrentPos, getCurrentPos, setCurrentPos } from "./geolocation.js";
import { loggedIn, GeoPoint, getMarkers, synchronize } from "../../firebase.js";

// Map

const pos = hasCurrentPos() ? getCurrentPos() : setCurrentPos();
const iut = new GeoPoint(48.842, 2.2679); // position par défaut

const map = L.map("map", { minZoom: 13 }).setView(
	[pos?.latitude || iut.latitude, pos?.longitude || iut.longitude],
	13 // zoom
);
L.tileLayer(
	"https://api.mapbox.com/styles/v1/yusa-ai/ckzsvx2du001e14ngnkdelz1r/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXVzYS1haSIsImEiOiJja3pmeDhyaWQyeGphMnZuOWU3cjFycWoxIn0.y9pV4e0r27XhX--vc6HVxA"
).addTo(map);

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
const marker = L.marker(
	[pos?.latitude || iut.latitude, pos?.longitude || iut.longitude],
	{
		icon: redMarker,
	}
).addTo(map);

// Popups

marker.bindPopup("<p>Vous êtes ici !</p>").openPopup();

// Functions

let timer;

const placeMarker = (e, popupText) => {
	const { lat, lng } = e.latlng;

	// Ajout sur la carte
	const marker = L.marker([lat, lng], { icon: redMarker }).addTo(map);
	marker.bindPopup(popupText);

	// Plus besoin de la variable en local storage
	localStorage.removeItem("popup");
	$("#popup-text").val("");

	// Programmation de la suppression
	marker.on("contextmenu", () => {
		if (loggedIn()) {
			map.removeLayer(marker);
			const index = markers.indexOf(marker);
			markers.splice(index, 1); // supprime le marqueur
			planSync();
		}
	});

	markers.push({ coords: { latitude: lat, longitude: lng }, popup: popupText });
};

const planSync = () => {
	clearTimeout(timer);
	timer = setTimeout(async () => {
		synchronize(oldMarkers, markers);
		markers = await getMarkers();
		oldMarkers = [...markers];
	}, 1000);
};

let markers = await getMarkers();
$.each(markers, (undefined, marker) => {
	placeMarker(
		{
			latlng: { lat: marker.coords.latitude, lng: marker.coords.longitude },
		},
		marker.popup
	);
});
let oldMarkers = [...markers]; // copie

if (loggedIn()) {
	map.on("click", (e) => {
		const popupText = localStorage.getItem("popup");
		if (popupText) {
			placeMarker(e, popupText);
			planSync();
		}
	});
	map.on("contextmenu", () => {}); // disable browser context menu
}
