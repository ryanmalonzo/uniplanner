import { login } from "../../firebase.js";

$("#nav-connexion").click(() => {
  $("#login-modal").addClass("is-active");
});

$("#no-account").click(() => {
  $("#login-modal").removeClass("is-active");
  $("#register-modal").addClass("is-active");
});

$("#login-modal").click((e) => {
  if ($(e.target).hasClass("modal-background")) {
    $("#login-modal").removeClass("is-active");
  }
});

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
