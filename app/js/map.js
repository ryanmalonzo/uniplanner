import { getNom, loggedIn } from "../../firebase.js";

// Get user

const currentUser = loggedIn();
if (currentUser) {
	$("#nav-inscription").hide();
	$("#nav-connexion").hide();
	$("#nav-deconnexion").show();

	const nom = await getNom(currentUser);
	$("#nav-nom").text(`Bienvenue, ${nom}`);
}

// Functions

function hasGeoPermission() {
	return new Promise((resolve) => {
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			resolve(result.state === "granted");
		});
	});
}

export function getCurrentPos() {
	return JSON.parse(localStorage.getItem("pos"));
}

export function setCurrentPos() {
	navigator.geolocation.getCurrentPosition((position) => {
		if (position) {
			localStorage.setItem(
				"pos",
				JSON.stringify({
					lat: position.coords.latitude,
					long: position.coords.longitude,
				})
			);
		} else {
			localStorage.setItem(
				"pos",
				JSON.stringify({
					// IUT
					lat: 48.842,
					long: 2.2679,
				})
			);
		}
		location.reload();
		return getCurrentPos();
	});
}

export function hasCurrentPos() {
	return getCurrentPos() !== undefined && getCurrentPos() !== null;
}

// Modal

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
