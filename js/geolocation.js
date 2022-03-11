import { GeoPoint } from "../firebase.js";

function hasGeoPermission() {
	return new Promise((resolve) => {
		// Problème de compatibilité avec Safari
		if (window.safari !== undefined) {
			resolve(true);
		}

		if (navigator.geolocation) {
			navigator.permissions.query({ name: "geolocation" }).then((result) => {
				resolve(result.state === "granted");
			});
		} else {
			resolve(false);
		}
	});
}

function getCurrentPos() {
	const pos = JSON.parse(localStorage.getItem("pos"));
	if (pos === undefined || pos === null) {
		return null;
	}
	return new GeoPoint(pos.latitude, pos.longitude);
}

function setCurrentPos() {
	navigator.geolocation.getCurrentPosition((position) => {
		if (position) {
			localStorage.setItem(
				"pos",
				JSON.stringify(
					new GeoPoint(position.coords.latitude, position.coords.longitude)
				)
			);
		}
		location.reload();
		return getCurrentPos();
	});
}

function hasCurrentPos() {
	return getCurrentPos() !== null;
}

export { hasGeoPermission, getCurrentPos, setCurrentPos, hasCurrentPos };
