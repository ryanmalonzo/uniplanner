import { login } from "../../firebase.js";

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

// Traitement de la connexion
$("#login-btn").click(async () => {
	const mail = $("#login-mail").val();
	const mdp = $("#login-mdp").val();

	if (mail && mdp) {
		login(mail, mdp).then(() => {
			location.reload();
		});
	} else {
		console.error("L'un des champs est vide.");
	}
});
