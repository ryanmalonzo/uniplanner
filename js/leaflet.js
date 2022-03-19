import { hasCurrentPos, getCurrentPos, setCurrentPos } from "./geolocation.js";
import {
	username,
	GeoPoint,
	getMarkers,
	addToDatabase,
	removeFromDatabase,
} from "../firebase.js";
import { API_KEY } from "../config.js";

// Map

const pos = hasCurrentPos() ? getCurrentPos() : setCurrentPos();
const center = new GeoPoint(48.864716, 2.349014); // centre de Paris

const map = L.map("map", {
	zoomControl: false,
	attributionControl: false,
}).setView(
	[pos?.latitude || center.latitude, pos?.longitude || center.longitude],
	13 // zoom
);
L.tileLayer(
	"https://api.mapbox.com/styles/v1/yusa-ai/cl0b3ef5u001314o17n961mja/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXVzYS1haSIsImEiOiJja3pmeDhyaWQyeGphMnZuOWU3cjFycWoxIn0.y9pV4e0r27XhX--vc6HVxA",
	{
		noWrap: true,
		bounds: [
			[-90, -180],
			[90, 180],
		],
	}
).addTo(map);

// map.zoomControl.setPosition("bottomright");

// Markers

const red = new L.Icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [0, -34],
	shadowSize: [41, 41],
});

const frenchFries = L.divIcon({
	html: twemoji.parse("\uD83C\uDF5F"),
	iconSize: [36, 36],
	popupAnchor: [-3, -12],
	className: "dummy",
});

const beerMugs = L.divIcon({
	html: twemoji.parse("\ud83c\udf7b"),
	iconSize: [36, 36],
	popupAnchor: [0, -12],
	className: "dummy",
});

const shoppingCart = L.divIcon({
	html: twemoji.parse("\uD83D\uDED2"),
	iconSize: [36, 36],
	popupAnchor: [0, -6],
	className: "dummy",
});

const nationalPark = L.divIcon({
	html: twemoji.parse("\uD83C\uDFDE"),
	iconSize: [36, 36],
	popupAnchor: [-3, -12],
	className: "dummy",
});

const books = L.divIcon({
	html: twemoji.parse("\uD83D\uDCDA"),
	iconSize: [36, 36],
	popupAnchor: [0, -12],
	className: "dummy",
});

// Marqueur sur position courante (service de géolocalisation)

if (pos) {
	const marker = L.marker([pos.latitude, pos.longitude], {
		icon: red,
	}).addTo(map);
	marker.bindPopup("<p>Vous êtes ici !</p>").openPopup();
}

// Marqueurs

const getIcone = (ico) => {
	if (ico) {
		switch (ico) {
			case "frenchFries":
				return { ic: frenchFries, text: "frenchFries" };
			case "beerMugs":
				return { ic: beerMugs, text: "beerMugs" };
			case "shoppingCart":
				return { ic: shoppingCart, text: "shoppingCart" };
			case "nationalPark":
				return { ic: nationalPark, text: "nationalPark" };
			case "books":
				return { ic: books, text: "books" };
			default:
				return { ic: red, text: "red" };
		}
	} else {
		switch ($("#marker-selector-image").attr("src")) {
			case "./assets/markers/french-fries.png":
				return { ic: frenchFries, text: "frenchFries" };
			case "./assets/markers/clinking-beer-mugs.png":
				return { ic: beerMugs, text: "beerMugs" };
			case "./assets/markers/shopping-cart.png":
				return { ic: shoppingCart, text: "shoppingCart" };
			case "./assets/markers/national-park.png":
				return { ic: nationalPark, text: "nationalPark" };
			case "./assets/markers/books.png":
				return { ic: books, text: "books" };
			default:
				return { ic: red, text: "red" };
		}
	}
};

let timer;

getMarkers().then((markers) => {
	$.each(markers, (undefined, marker) => {
		placeMarker(
			{
				latlng: { lat: marker.coords.latitude, lng: marker.coords.longitude },
			},
			marker.popup,
			marker.icon
		);
	});
});

const placeMarker = (e, popupText, ico) => {
	const { lat, lng } = e.latlng;

	let { ic, text } = getIcone(ico);

	// Ajout sur la carte
	const marker = L.marker([lat, lng], { icon: ic }).addTo(map);
	marker.bindPopup(popupText);

	// Programmation de la suppression
	marker.on("contextmenu", () => {
		if (username) {
			map.removeLayer(marker);
			removeFromDatabase(marker);
		}
	});

	return { lat, lng, text };
};

const placeNewMarker = (e, popupText, ico) => {
	const { lat, lng, text } = placeMarker(e, popupText, ico);

	if ($("#popup-text").val() && $("#popup-text").val() !== "") {
		$("#popup-text").val("");
	}

	// Reset bouton ajout
	$("#add-marker").html("Ajouter");
	$("#add-marker").removeClass("is-dark");
	$("#add-marker").addClass("is-info");

	addToDatabase({
		coords: { latitude: lat, longitude: lng },
		popup: popupText,
		icon: text,
	});
};

if (username) {
	// Si connecté
	map.on("click", (e) => {
		const popupText = $("#popup-text").val();
		if (popupText && popupText !== "") {
			placeNewMarker(e, popupText);
		}
	});
	map.on("contextmenu", () => {}); // disable browser context menu
}

// Glisser-déposer pour changer de pays (jQuery UI)

$(() => {
	$("#france").draggable({ cancel: false, revert: "valid" });
	$("#canada").draggable({ cancel: false, revert: "valid" });
	$("#belgique").draggable({ cancel: false, revert: "valid" });

	$("#map").droppable({
		accept: ".country-button",
		drop: (undefined, ui) => {
			switch (ui.draggable.attr("id")) {
				case "france":
					map.setView(new L.LatLng(46.71109, 1.7191036), 7);
					break;
				case "canada":
					map.setView(new L.LatLng(56.130366, -106.346771), 5);
					break;
				case "belgique":
					map.setView(new L.LatLng(50.5039, 4.4699), 9);
					break;
				default:
					console.error("Pays inconnu.");
			}
		},
	});
});

// ... Ou tout simplement en cliquant sur les boutons

$("#france").click(() => {
	map.setView(new L.LatLng(46.71109, 1.7191036), 7);
});

$("#canada").click(() => {
	map.setView(new L.LatLng(56.130366, -106.346771), 5);
});

$("#belgique").click(() => {
	map.setView(new L.LatLng(50.5039, 4.4699), 9);
});

// Recherche de position par adresse postale

$("#search-address").click(() => {
	$.ajax({
		method: "get",
		url: "https://cors-yusa.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json",
		data: {
			query: $("#search-text").val(),
			key: API_KEY.GOOGLE_MAPS,
		},
		success: (response) => {
			const res = response.results[0];
			const lat = res.geometry.location.lat;
			const lng = res.geometry.location.lng;

			const marker = L.marker([lat, lng]).addTo(map);
			marker.bindPopup(res.formatted_address).openPopup();
			map.panTo([lat, lng]); // centre la carte sur le point

			marker.on("contextmenu", () => {
				if (username) {
					map.removeLayer(marker);
				}
			});

			$("#search-text").val("");
		},
	});
});
