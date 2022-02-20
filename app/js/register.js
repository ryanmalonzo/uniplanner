const btnInscription = document.querySelector("#navInscription");
btnInscription.addEventListener("click", () => {
  document.querySelector("#register").classList.add("is-active");
});

const hasAccount = document.querySelector("#has-account");
hasAccount.addEventListener("click", () => {
  document.querySelector("#register").classList.remove("is-active");
  document.querySelector("#login").classList.add("is-active");
});

$("#register").click((e) => {
  if ($(e.target).hasClass("modal-background")) {
    $("#register").removeClass("is-active");
  }
});
