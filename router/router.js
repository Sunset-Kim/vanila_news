import { routes } from "./routes_path";

export default class HashRouter {
  /**
   *
   * @param {pathlist} key: string, value: html iteral
   * @param {container} domElement
   */
  constructor(pathlist, container) {
    this.pathlist = pathlist;
    this.container = container;

    window.addEventListener("hashchange", () => {
      const path = window.location.hash.replace("#", "");

      this.render(path, this.container);
    });
  }

  async render(path, dom = this.container) {
    dom.innerHTML = (await this.pathlist[path]) || this.pathlist[404];
  }
}
