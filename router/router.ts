import Detail from "../pages/Detail";
import Home from "../pages/Home";

export default class HashRouter {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;

    window.addEventListener("hashchange", () => {
      this.render(location.hash, this.container);
    });
  }

  async render(path = "/", dom = this.container) {
    const slug = path.split("/");

    if (!slug[1] || slug[1] === "page") {
      console.log("page", slug[2]);
      dom.innerHTML = await Home();
    } else if (slug[1] === "news") {
      dom.innerHTML = await Detail(slug[2]);
    }
  }
}
