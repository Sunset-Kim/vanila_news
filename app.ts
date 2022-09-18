import DetailPage from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import HashRouter from "./router/router";

const router = new HashRouter();
const home = new Home("app");
const detail = new DetailPage("app");

router.setDefaultPage(home);
router.addRouterPath("/page/", home);
router.addRouterPath("/news/", detail);

router.route();
