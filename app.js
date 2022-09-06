const ajax = new XMLHttpRequest();
const BASE_URL = "https://api.hnpwa.com/v0";
const NEWS_URL = `${BASE_URL}/news/1.json`;
const ITEMS_URL = (id) => `${BASE_URL}/item/${id}.json`;

ajax.open("get", NEWS_URL, false);
ajax.send();

const newFeeds = JSON.parse(ajax.response);

const app = document.getElementById("app");
const container = document.createElement("div");
const ul = document.createElement("ul");

window.addEventListener("hashchange", () => {
  const id = window.location.hash.substring(1);
  ajax.open("get", ITEMS_URL(id), false);
  ajax.send();
  const content = JSON.parse(ajax.response);

  console.log(content);

  const h2 = document.createElement("h2");
  h2.innerText = content.title;

  container.appendChild(h2);
});

const contents = newFeeds.forEach((feed) => {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.innerHTML = `${feed.title} (${feed.comments_count})`;
  a.setAttribute("href", `#${feed.id}`);
  li.appendChild(a);
  ul.appendChild(li);
});

app.appendChild(ul);
app.appendChild(container);
