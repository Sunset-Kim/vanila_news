import Ajax from "./services/ajax";
import HackerAPIService from "./services/hackerAPI";

function render(template, dom) {
  dom.innerHTML = template;
}

const app = document.getElementById("app");
const hackerAPI = new HackerAPIService(new Ajax());

window.addEventListener("DOMContentLoaded", async () => {
  const newsfeeds = await hackerAPI.getNewsfeeds();

  const result = [];
  result.push("<ul>");

  newsfeeds.forEach((feed) => {
    result.push(`
      <li>
        <a href="#${feed.id}">
          ${feed.title} (${feed.comments_count})
        </a>
      </li>
      `);
  });

  result.push("</ul>");

  render(result.join(""), app);
});

window.addEventListener("hashchange", async () => {
  const id = location.hash.substring(1);

  const newsItem = await hackerAPI.getNewsItem(id);

  console.log(newsItem);

  const template = `
    <h1>${newsItem.title}</h1>
    <a href="/">목록으로</a>
  `;

  render(template, app);
});
