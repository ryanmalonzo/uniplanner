const btnConnexion = document.querySelector("#navConnexion");
btnConnexion.addEventListener("click", () => {
  document.querySelector("#login").classList.add("is-active");
});

const noAccount = document.querySelector("#no-account");
noAccount.addEventListener("click", () => {
  document.querySelector("#login").classList.remove("is-active");
  document.querySelector("#register").classList.add("is-active");
});

$("#login").click((e) => {
  if ($(e.target).hasClass("modal-background")) {
    $("#login").removeClass("is-active");
  }
});
