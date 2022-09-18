import Ajax from "../../services/ajax";
import HackerAPIService, { NewsItem } from "../../services/hackerAPI";
import { store } from "../../store/store";
import View from "../View";
import { detailTemplate } from "./Detail.template";

export default class DetailPage extends View {
  api: HackerAPIService;
  content: NewsItem | null;
  id: number | null;

  constructor(containerId: string) {
    const template = detailTemplate;
    super(containerId, template);
    this.api = new HackerAPIService(new Ajax());
    this.content = null;
    this.id = null;
  }

  makeComments(commentsList: NewsItem[], called = 0) {
    for (let i = 0; i < commentsList.length; i++) {
      const { user, content, time_ago, title, comments, comments_count } = commentsList[i];

      this.addHtml(`
      <div class="ml-${called * 4} relative z-10">
      
        <div class="relative z-10 pb-2">
          <div class="relative mb-2 py-2 px-6 bg-white rounded-md shadow-xl ring-1 ring-slate-900/5 divide-y divide-slate-100 my-auto xl:mt-18 dark:bg-slate-800 dark:divide-slate-200/5 dark:highlight-white/10">
            <div class="py-2">${content}</div>
            <div class="py-2 flex w-full justify-between">
              <span class="text-sm text-indigo-800">${time_ago}</span>
              <span class="text-sm text-indigo-800">${user}</span>
            </div>
          </div>
        </div>
      </div>`);

      if (comments_count > 0) {
        this.addHtml(this.makeComments(comments, called + 1));
      }
    }

    return this.getHtml();
  }

  async getContent() {
    const id = location.hash.split("/")[2];
    this.id = Number(id);
    const result = await this.api.getNewsItem(Number(id));

    store.setState({
      feeds: store.state.feeds?.map((feed) => {
        if (feed.id === this.id) {
          feed.isRead = true;
        }
        return feed;
      }),
    });

    this.content = result;
  }

  async render() {
    await this.getContent();

    if (this.content) {
      this.setTempleateData("title", this.content.title);
      this.setTempleateData("user", this.content.user || "");
      this.setTempleateData("time_ago", this.content.time_ago);
      this.setTempleateData("content", this.content.content);
      this.setTempleateData("comments", this.makeComments(this.content.comments));
      this.setTempleateData("current_page", String(store.state.currentPage));
    }

    this.updateView();
  }
}
