import NotFound from "../pages/404";
import Detail from "../pages/Detail";
import Home from "../pages/Home";

export const routes = {
  "/": Home(),
  404: NotFound(),
};
