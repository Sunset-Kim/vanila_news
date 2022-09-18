import Ajax from "../../services/ajax";
import HackerAPIService, { NewsFeed } from "../../services/hackerAPI";
import { Feed, store } from "../../store/store";
import View from "../View";
import { homeTemplate } from "./Home.template";

export default class Home extends View {
  api: HackerAPIService;
  feeds: Feed[] | null;
  currentPage: number | null;

  constructor(containerId: string) {
    let template = homeTemplate;

    super(containerId, template);
    this.api = new HackerAPIService(new Ajax());
    this.feeds = store.state.feeds || null;
    this.currentPage = null;
  }

  private async init() {
    if (!this.feeds || this.feeds.length === 0) {
      await this.setFeeds();
    }

    this.currentPage = Number(location.hash.split("/")[2]) || 1;
    store.setState({
      currentPage: this.currentPage,
    });
  }

  async setFeeds() {
    const result = await this.api.getNewsfeeds();
    const feeds = result.map((feed) => ({
      ...feed,
      isRead: false,
    }));
    this.feeds = feeds;

    store.setState({
      feeds,
    });
  }

  async render() {
    await this.init();
    const totalLength = this.feeds!.length;

    for (let i = (this.currentPage! - 1) * 5; i < (this.currentPage! - 1) * 5 + 5; i++) {
      const feed = this.feeds![i];
      this.addHtml(`
      <li class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <a class="block ${feed.isRead ? "bg-red-50" : ""} p-8 hover:bg-indigo-50 transition-colors" href="#/news/${
        feed.id
      }">
          
            <p class="uppercase tracking-wide text-base text-indigo-500 font-semibold">
              ${feed.title} (${feed.comments_count})
            </p>
            
            <div class="flex gap-2 mt-2 items-center"> 
              <p class="text-slate-600">${feed.user}</p>
              <p class="text-slate-500 font-light">${feed.time_ago}</p>
            </div>
            
          </a>
      </li>
      `);
    }

    this.setTempleateData("news_feed", this.getHtml());
    this.setTempleateData("prev_page", store.state.currentPage > 1 ? String(store.state.currentPage - 1) : String(1));
    this.setTempleateData(
      "next_page",
      store.state.currentPage >= totalLength / 5 ? String(totalLength / 5) : String(store.state.currentPage + 1)
    );
    this.setTempleateData("current_page", String(store.state.currentPage));
    this.setTempleateData("total_page", String(totalLength / 5));

    this.updateView();
  }
}
