import HashRouter from "./router/router";
import { routes } from "./router/routes_path";

const root = document.getElementById("app");

const router = new HashRouter(routes, root);

const hash = location.hash;

console.log(hash ? true : false);

if (hash) {
  router.render("/" + hash.replace("#", ""));
} else {
  router.render("/");
}
