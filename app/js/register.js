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
  register("ryan@ryanmalonzo.fr", "test1234");
});
