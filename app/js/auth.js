import * as bulmaToast from "../lib/rfoel/bulma-toast.js";
import { register, login, logout } from "../../firebase.js";

bulmaToast.setDefaults({
	duration: 3000,
	position: "bottom-right",
	closeOnClick: true,
});

// Messages d'erreur Firebase
const errorMsg = (error) => {
	switch (error.code) {
		case "auth/invalid-email":
			return "Adresse mail invalide.";
		case "auth/wrong-password":
			return "Mot de passe incorrect.";
		case "auth/user-not-found":
			return "Utilisateur inconnu.";
		case "auth/weak-password":
			return "Votre mot de passe doit faire au moins 6 caractères.";
		default:
			console.log(error);
			return error.message;
	}
};

// Inscription
$("#register-btn").click(async () => {
	const nom = $("#register-nom").val();
	const mail = $("#register-mail").val();
	const mdp = $("#register-mdp").val();

	if (!nom) {
		bulmaToast.toast({
			message: "Veuillez saisir votre nom.",
			type: "is-danger",
		});
		return;
	}

	if (!mail) {
		bulmaToast.toast({
			message: "Veuillez saisir votre adresse mail.",
			type: "is-danger",
		});
		return;
	}

	if (!mdp) {
		bulmaToast.toast({
			message: "Veuillez saisir votre mot de passe.",
			type: "is-danger",
		});
		return;
	}

	await register(nom, mail, mdp)
		.then(() => location.reload())
		.catch((error) => {
			bulmaToast.toast({ message: errorMsg(error), type: "is-danger" });
		});
});

// Connexion
$("#login-btn").click(async () => {
	const mail = $("#login-mail").val();
	const mdp = $("#login-mdp").val();

	if (!mail) {
		bulmaToast.toast({
			message: "Veuillez saisir votre adresse mail.",
			type: "is-danger",
		});
		return;
	}

	if (!mdp) {
		bulmaToast.toast({
			message: "Veuillez saisir votre mot de passe.",
			type: "is-danger",
		});
		return;
	}

	await login(mail, mdp)
		.then(() => location.reload())
		.catch((error) => {
			bulmaToast.toast({ message: errorMsg(error), type: "is-danger" });
		});
});

// Déconnexion

$("#nav-deconnexion").click(async () => {
	await logout().then(() => location.reload());
});
