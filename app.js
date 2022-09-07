const ajax = new XMLHttpRequest();
const BASE_URL = "https://api.hnpwa.com/v0";
const NEWS_URL = `${BASE_URL}/news/1.json`;
const ITEMS_URL = (id) => `${BASE_URL}/item/${id}.json`;

const app = document.getElementById("app");

window.addEventListener("hashchange", () => getNewsItem());

function getData(url) {
  ajax.open("get", url, false);
  ajax.send();
  return JSON.parse(ajax.response);
}

function getNewsList() {
  const newsFeeds = getData(NEWS_URL);
  const result = [];

  result.push("<ul>");
  newsFeeds.forEach((feed) => {
    const list = `<li>
    <a href="#${feed.id}">
      ${feed.title} (${feed.comments_count})
    </a>
    </li>`;

    result.push(list);
  });
  result.push("</ul>");

  return result;
}

function getNewsItem() {
  const id = window.location.hash.substring(1);
  const item = getData(ITEMS_URL(id));

  const html = `
  <h1>${item.title}</h1>
  <div>
    <a href="#">목록으로</a>
  </div>
  `;

  app.innerHTML = html;
}

app.innerHTML = getNewsList().join("");
