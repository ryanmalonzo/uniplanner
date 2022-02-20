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
