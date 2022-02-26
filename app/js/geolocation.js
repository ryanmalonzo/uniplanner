import { GeoPoint } from "../../firebase.js";

function hasGeoPermission() {
	return new Promise((resolve) => {
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			resolve(result.state === "granted");
		});
	});
}

function getCurrentPos() {
	const pos = JSON.parse(localStorage.getItem("pos"));
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
		} else {
			localStorage.setItem(
				"pos",
				JSON.stringify(new GeoPoint(48.842, 2.2679)) // IUT
			);
		}
		location.reload();
		return getCurrentPos();
	});
}

function hasCurrentPos() {
	return getCurrentPos() !== undefined && getCurrentPos() !== null;
}

export { hasGeoPermission, getCurrentPos, setCurrentPos, hasCurrentPos };
