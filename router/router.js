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

    if (!slug[1] || slug[1] === "page") {
      console.log("page", slug[2]);
      dom.innerHTML = await Home(slug[2]);
    } else if (slug[1] === "news") {
      dom.innerHTML = await Detail(slug[2]);
    }
  }
}
