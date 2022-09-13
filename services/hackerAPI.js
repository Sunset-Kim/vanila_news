import Ajax from "./ajax";

class HackerAPIService {
  #BASE_URL = "https://api.hnpwa.com/v0";
  #NEWS_URL = (page) => `${this.#BASE_URL}/news/${page}.json`;
  #ITEMS_URL = (id) => `${this.#BASE_URL}/item/${id}.json`;

  constructor(ajax) {
    this.ajax = ajax;
  }

  async getNewsfeeds(page = 1) {
    return await this.ajax.send("get", this.#NEWS_URL(page));
  }

  async getNewsItem(id) {
    return await this.ajax.send("get", this.#ITEMS_URL(id));
  }
}

export default new HackerAPIService(new Ajax());
