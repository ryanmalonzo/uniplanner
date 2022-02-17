let navInscription = document.querySelector("#navInscription");
let navConnexion = document.querySelector("#navConnexion");

if (navInscription) {
  navInscription.addEventListener("click", () => {
    window.location.href = "./register.html";
  });
}

if (navConnexion) {
  navConnexion.addEventListener("click", () => {
    window.location.href = "./login.html";
  });
}
