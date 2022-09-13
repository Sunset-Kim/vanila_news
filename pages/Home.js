import HackerAPIService from "../services/hackerAPI";
import { store } from "../store/store";

const hackerAPI = HackerAPIService;

export default async function Home(page) {
  const currentPage = Number(location.hash.split("/")[2]) || 1;

  store.setState({
    currentPage,
  });

  try {
    if (!store.state.feeds) {
      const newsfeeds = await hackerAPI.getNewsfeeds();
      store.setState({
        feeds: newsfeeds,
      });
    }

    const totalLength = store.state.feeds.length;
    const newsList = [];
    let template = `
    <div class="min-h-screen bg-gray-50">
      
        <div class="bg-gray-800 mx-auto px-2 sm:px-6 lg:px-8 xl:px-10">
          <h1 class="text-white font-bold">Hacker News</h1>
        </div>
        
        <div class="mx-auto px-2 sm:px-6 lg:px-8 xl:px-10">
          <ul>
            {{__news_feed__}}
          </ui>
          <div>
            <a href="#/page/{{__prev_page__}}">이전페이지</a>
            <a href="#/page/{{__next_page__}}">다음페이지</a>
          </div>
        </div>
      
      
    </div>`;

    const feeds = store.state.feeds;

    for (let i = (currentPage - 1) * 5; i < (currentPage - 1) * 5 + 5; i++) {
      newsList.push(`
      <li>
        <a href="#/news/${feeds[i].id}">
          ${feeds[i].title} (${feeds[i].comments_count})
        </a>
      </li>
      `);
    }

    template = template.replace("{{__news_feed__}}", newsList.join(""));
    template = template.replace("{{__prev_page__}}", store.state.currentPage > 1 ? store.state.currentPage - 1 : 1);
    template = template.replace(
      "{{__next_page__}}",
      store.state.currentPage >= totalLength / 5 ? totalLength / 5 : store.state.currentPage + 1
    );

    return template;
  } catch (error) {
    console.log("navigate 500");
  }
}
