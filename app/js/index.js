import { username } from "../../firebase.js";
import { hasGeoPermission, setCurrentPos } from "./geolocation.js";
import * as bulmaToast from "../lib/rfoel/bulma-toast.js";

// Récupère utilisateur courant (if any)

if (username) {
	$("#nav-inscription").hide();
	$("#nav-connexion").hide();
	$("#nav-deconnexion").show();

	$("#nav-username").text(username);

	$(".footer").show();
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
	{ src: "./assets/markers/red-marker.png", desc: "Marqueur par défaut" },
	{ src: "./assets/markers/french-fries.png", desc: "Restaurant" },
	{ src: "./assets/markers/clinking-beer-mugs.png", desc: "Bar" },
	{ src: "./assets/markers/shopping-cart.png", desc: "Supermarché" },
	{ src: "./assets/markers/national-park.png", desc: "Parc" },
	{ src: "./assets/markers/books.png", desc: "Bibliothèque" },
];

// Marker selector

$("#marker-selector").click(() => {
	let index = markers.findIndex((marker) => {
		return marker.src === $("#marker-selector-image").attr("src");
	});

	index = index < markers.length - 1 ? index + 1 : 0;

	$("#marker-selector-image").attr("src", markers[index].src);
	$("#marker-text > p").text(markers[index].desc);
});

// User toolbar

$("#add-marker").click((e) => {
	const elt = e.target;

	// Si l'utilisateur annule son ajout
	if ($(elt).html() === "Annuler") {
		$("#popup-text").val("");
		$(elt).html("Ajouter");
		$(elt).removeClass("is-dark");
		$(elt).addClass("is-info");
		return;
	}

	const popupText = $("#popup-text").val();
	if (!popupText || popupText === "") {
		bulmaToast.toast({
			message: "Merci de saisir une description pour votre marqueur.",
			type: "is-danger",
		});
	} else {
		// Passe en état "annuler"
		$(elt).html("Annuler");
		$(elt).removeClass("is-info");
		$(elt).addClass("is-dark");
	}
});
