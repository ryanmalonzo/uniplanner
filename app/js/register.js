import { register } from "../../firebase.js";

$("#nav-inscription").click(() => {
  $("#register-modal").addClass("is-active");
});

$("#has-account").click(() => {
  $("#register-modal").removeClass("is-active");
  $("#login-modal").addClass("is-active");
});

$("#register-modal").click((e) => {
  if ($(e.target).hasClass("modal-background")) {
    $("#register-modal").removeClass("is-active");
  }
});

$("#register-btn").click(async () => {
  const nom = $("#register-nom").val();
  const mail = $("#register-mail").val();
  const mdp = $("#register-mdp").val();

  if (nom && mail && mdp) {
    await register(nom, mail, mdp).then(() => {
      location.reload();
    });
  } else {
    console.error("L'un des champs est vide.");
  }
});
