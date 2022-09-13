import HackerAPIService from "../services/hackerAPI";
import { store } from "../store/store";

const hackerAPI = HackerAPIService;

export default async function Home(page) {
  const currentPage = Number(location.hash.split("/")[2]) || 1;

  store.setState({
    currentPage,
  });

  try {
    const newsfeeds = await hackerAPI.getNewsfeeds();

    store.setState({
      feeds: newsfeeds,
    });

    const totalLength = store.state.feeds.length;

    const result = [];
    result.push("<ul>");

    const feeds = store.state.feeds;

    for (let i = (currentPage - 1) * 5; i < (currentPage - 1) * 5 + 5; i++) {
      result.push(`
      <li>
        <a href="#/news/${feeds[i].id}">
          ${feeds[i].title} (${feeds[i].comments_count})
        </a>
      </li>
      `);
    }

    result.push("</ul>");

    result.push(`
    <div>
      <a href="#/page/${currentPage - 1 < 1 ? 1 : currentPage - 1}">이전페이지</a>
      <a href="#/page/${currentPage + 1 > totalLength / 5 ? totalLength / 5 : currentPage + 1}">다음페이지</a>
    </div>
    `);

    return result.join(" ");
  } catch (error) {
    console.log("navigate 500");
  }
}
