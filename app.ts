import Home from "./pages/Home/Home";
import HashRouter from "./router/router";

const router = new HashRouter();
const home = new Home("app");

router.setDefaultPage(home);
router.addRouterPath("/page/", home);

router.route();
