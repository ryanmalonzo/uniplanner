function hasGeoPermission() {
	return new Promise((resolve) => {
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			resolve(result.state === "granted");
		});
	});
}

function getCurrentPos() {
	return JSON.parse(localStorage.getItem("pos"));
}

function setCurrentPos() {
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

function hasCurrentPos() {
	return getCurrentPos() !== undefined && getCurrentPos() !== null;
}

export { hasGeoPermission, getCurrentPos, setCurrentPos, hasCurrentPos };
