import Ajax from "./ajax";

export interface NewsFeed {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
}

export interface NewsItem {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  time_ago: string;
  content: string;
  deleted?: boolean;
  dead?: boolean;
  type: string;
  url?: string;
  domain?: string;
  comments: NewsItem[]; // Comments are items too
  level: number;
  comments_count: number;
}

export default class HackerAPIService {
  #BASE_URL = "https://api.hnpwa.com/v0";
  #NEWS_URL = `${this.#BASE_URL}/news/1.json`;
  #ITEMS_URL = (id: number) => `${this.#BASE_URL}/item/${id}.json`;
  ajax: Ajax;

  constructor(ajax: Ajax) {
    this.ajax = ajax;
  }

  async getNewsfeeds(): Promise<NewsFeed[]> {
    return await this.ajax.send("get", this.#NEWS_URL);
  }

  async getNewsItem(id: number): Promise<NewsItem> {
    return await this.ajax.send("get", this.#ITEMS_URL(id));
  }
}
