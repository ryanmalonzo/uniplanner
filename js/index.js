let button = document.querySelector("button");
button.addEventListener(
  "click",
  () => (window.location.href = "./app/login.html")
);

// TODO add error handling
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude + ", " + position.coords.longitude);
  });
}
