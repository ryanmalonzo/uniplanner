import { username } from "../../firebase.js";
import { hasGeoPermission, setCurrentPos } from "./geolocation.js";
import * as bulmaToast from "../lib/rfoel/bulma-toast.js";

// Récupère utilisateur courant (if any)

if (username) {
	$("#nav-inscription").hide();
	$("#nav-connexion").hide();
	$("#nav-deconnexion").show();

	$("#nav-username").text(username);

	$("#marker-selector").show();
	$("#user-toolbar").show();
}

// Modals

// MODAL À propos

$("#nav-about").click(() => {
	$("#about-modal").addClass("is-active");
});

// Ferme le modal lorsqu'on clique en dehors
$("#about-modal").click((e) => {
	if ($(e.target).hasClass("modal-background")) {
		$("#about-modal").removeClass("is-active");
	}
});

// MODAL Avertissement géolocalisation

hasGeoPermission().then((granted) => {
	if (!granted) {
		const modal = document.querySelector("#geo-modal");
		modal.classList.add("is-active");
	}
});

document.querySelector("#geo-modal-button").addEventListener("click", () => {
	setCurrentPos();
	$("#geo-modal").removeClass("is-active");
});

// MODAL Connexion

$("#nav-connexion").click(() => {
	$("#login-modal").addClass("is-active"); // active modal Bulma
});

$("#no-account").click(() => {
	// Ferme formulaire connexion et ouvre formulaire inscription
	$("#login-modal").removeClass("is-active");
	$("#register-modal").addClass("is-active");
});

// Ferme le formulaire de connexion lorsqu'on clique en dehors
$("#login-modal").click((e) => {
	if ($(e.target).hasClass("modal-background")) {
		$("#login-modal").removeClass("is-active");
	}
});

// MODAL Inscription

$("#nav-inscription").click(() => {
	$("#register-modal").addClass("is-active");
});

$("#has-account").click(() => {
	$("#register-modal").removeClass("is-active");
	$("#login-modal").addClass("is-active");
});

$("#register-modal").click((e) => {
	if ($(e.target).hasClass("modal-background")) {
		$("#register-modal").removeClass("is-active");
	}
});

const markers = [
	"./assets/markers/red-marker.png",
	"./assets/markers/french-fries.png",
	"./assets/markers/clinking-beer-mugs.png",
	"./assets/markers/shopping-cart.png",
	"./assets/markers/national-park.png",
	"./assets/markers/books.png",
];

// Marker selector

$("#marker-selector").click(() => {
	const index = markers.indexOf($("#marker-selector-image").attr("src"));
	if (index < markers.length - 1) {
		$("#marker-selector-image").attr("src", markers[index + 1]);
	} else {
		$("#marker-selector-image").attr("src", markers[0]);
	}
});

// User toolbar

$("#add-marker").click(() => {
	const popupText = $("#popup-text").val();
	if (popupText) {
		localStorage.setItem("popup", popupText);
	} else {
		bulmaToast.toast({
			message: "Merci de saisir une description pour votre marqueur.",
			type: "is-danger",
		});
	}
});
