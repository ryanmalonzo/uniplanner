import { getNom } from "../../firebase.js";

// Get user

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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
    const pos = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    localStorage.setItem("pos", JSON.stringify(pos));
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
    const pos = {
      lat: 48.842,
      long: 2.2679,
    };
    localStorage.setItem("pos", JSON.stringify(pos));
  }
});

document.querySelector("#geo-modal-button").addEventListener("click", () => {
  setCurrentPos();
  $("#geo-modal").removeClass("is-active");
});
