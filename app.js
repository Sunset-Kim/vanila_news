import HashRouter from "./router/router";

const root = document.getElementById("app");

const router = new HashRouter(root);

router.render(location.hash);
