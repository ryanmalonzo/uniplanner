$("#navInscription").click(() => {
  $("#register").addClass("is-active");
});

$("#has-account").click(() => {
  $("#register").removeClass("is-active");
  $("#login").addClass("is-active");
});

$("#register").click((e) => {
  if ($(e.target).hasClass("modal-background")) {
    $("#register").removeClass("is-active");
  }
});
