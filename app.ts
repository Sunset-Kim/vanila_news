import HashRouter from "./router/router";

const root = document.getElementById("app") as HTMLDivElement;
const router = new HashRouter(root);

router.render(location.hash);
