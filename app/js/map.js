import { getNom, loggedIn } from "../../firebase.js";
import { hasGeoPermission, setCurrentPos } from "./geolocation.js";

// Récupère utilisateur courant (if any)

const currentUser = loggedIn();
if (currentUser) {
	$("#nav-inscription").hide();
	$("#nav-connexion").hide();
	$("#nav-deconnexion").show();

	const nom = await getNom(currentUser);
	$("#nav-nom").text(`Bienvenue, ${nom}`);
}

// Modals

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
