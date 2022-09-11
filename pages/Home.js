import HackerAPIService from "../services/hackerAPI";

const hackerAPI = HackerAPIService;

export default async function Home() {
  try {
    const newsfeeds = await hackerAPI.getNewsfeeds();

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

    return result.join(" ");
  } catch (error) {
    console.log("navigate 500");
  }
}
