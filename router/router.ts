import View from "../pages/View";

interface RouteInfo {
  path: string;
  page: View;
}
export default class HashRouter {
  routeTable: RouteInfo[];
  defaultRoute: RouteInfo | null;

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));

    this.routeTable = [];
    this.defaultRoute = null;
  }

  addRouterPath(path: string, page: View) {
    this.routeTable.push({
      path,
      page,
    });
  }

  setDefaultPage(page: View) {
    this.defaultRoute = { path: "", page };
  }

  route() {
    const routePath = location.hash;

    if (routePath === "" && this.defaultRoute) {
      this.defaultRoute.page.render();
    }

    for (const routeInfo of this.routeTable) {
      if (routePath.indexOf(routeInfo.path) >= 0) {
        routeInfo.page.render();
        break;
      }
    }
  }
}
