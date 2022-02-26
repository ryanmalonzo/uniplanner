import { register, login, logout } from "../../firebase.js";

// Inscription
$("#register-btn").click(async () => {
	const nom = $("#register-nom").val();
	const mail = $("#register-mail").val();
	const mdp = $("#register-mdp").val();

	if (nom && mail && mdp) {
		await register(nom, mail, mdp).then(() => {
			location.reload();
		});
	} else {
		console.error("L'un des champs est vide.");
	}
});

// Connexion
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

// Déconnexion

$("#nav-deconnexion").click(async () => {
	await logout();
	location.reload();
});
