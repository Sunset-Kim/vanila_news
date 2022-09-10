import Ajax from "./ajax";

class HackerAPIService {
  #BASE_URL = "https://api.hnpwa.com/v0";
  #NEWS_URL = `${this.#BASE_URL}/news/1.json`;
  #ITEMS_URL = (id) => `${this.#BASE_URL}/item/${id}.json`;

  constructor(ajax) {
    this.ajax = ajax;
  }

  async getNewsfeeds() {
    return await this.ajax.send("get", this.#NEWS_URL);
  }

  async getNewsItem(id) {
    return await this.ajax.send("get", this.#ITEMS_URL(id));
  }
}

export default new HackerAPIService(new Ajax());
