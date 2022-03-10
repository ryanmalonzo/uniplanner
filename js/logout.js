import { logout } from "../../firebase.js";

$("#nav-deconnexion").click(async () => {
  await logout();
  location.reload();
});
