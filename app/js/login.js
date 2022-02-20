$("#navConnexion").click(() => {
  $("#login").addClass("is-active");
});

$("#no-account").click(() => {
  $("#login").removeClass("is-active");
  $("#register").addClass("is-active");
});

$("#login").click((e) => {
  if ($(e.target).hasClass("modal-background")) {
    $("#login").removeClass("is-active");
  }
});
