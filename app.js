const ajax = new XMLHttpRequest();
const BASE_URL = "https://api.hnpwa.com/v0";
const NEWS_URL = `${BASE_URL}/news/1.json`;
const ITEMS_URL = (id) => `${BASE_URL}/item/${id}.json`;

function getData(url) {
  ajax.open("get", url, false);
  ajax.send();
  return JSON.parse(ajax.response);
}

const newFeeds = getData(NEWS_URL);

const app = document.getElementById("app");
const container = document.createElement("div");
const ul = document.createElement("ul");

window.addEventListener("hashchange", () => {
  const id = window.location.hash.substring(1);
  const content = getData(ITEMS_URL(id));

  const h2 = document.createElement("h2");
  h2.innerText = content.title;

  container.appendChild(h2);
});

const contents = newFeeds.forEach((feed) => {
  const div = document.createElement("div");

  div.innerHTML = `
  <li>
    <a href="#${feed.id}">${feed.title} (${feed.comments_count})</a>
  </li>
  `;

  ul.appendChild(div.firstElementChild);
});

app.appendChild(ul);
app.appendChild(container);
