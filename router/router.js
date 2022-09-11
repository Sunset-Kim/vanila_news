import Detail from "../pages/Detail";
import Home from "../pages/Home";

export default class HashRouter {
  constructor(container) {
    this.container = container;

    window.addEventListener("hashchange", () => {
      this.render(location.hash, this.container);
    });
  }

  async render(path = "/", dom = this.container) {
    const slug = path.split("/");

    if (!slug[1]) {
      dom.innerHTML = await Home();
    } else if (slug[1] === "news") {
      dom.innerHTML = await Detail(slug[2]);
    }
  }
}
