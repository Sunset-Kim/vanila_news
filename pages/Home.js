import HackerAPIService from "../services/hackerAPI";
import { store } from "../store/store";

const hackerAPI = HackerAPIService;

export default async function Home(page) {
  const currentPage = Number(location.hash.split("/")[2]) || 1;

  store.setState({
    currentPage,
  });

  console.log(store.state);

  try {
    const newsfeeds = await hackerAPI.getNewsfeeds(page);

    const result = [];
    result.push("<ul>");

    newsfeeds.forEach((feed) => {
      result.push(`
      <li>
        <a href="#/news/${feed.id}">
          ${feed.title} (${feed.comments_count})
        </a>
      </li>
      `);
    });

    result.push("</ul>");

    result.push(`
    <div>
      <a href="#/page/${currentPage - 1 < 1 ? 1 : currentPage - 1}">이전페이지</a>
      <a href="#/page/${currentPage + 1 > 10 ? 10 : currentPage + 1}">다음페이지</a>
    </div>
    `);

    return result.join(" ");
  } catch (error) {
    console.log("navigate 500");
  }
}
