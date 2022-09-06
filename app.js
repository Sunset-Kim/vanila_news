const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";

ajax.open("get", NEWS_URL, false);
ajax.send();

const newFeeds = JSON.parse(ajax.response);
const ul = document.createElement("ul");

const contents = newFeeds.forEach((feed) => {
  const li = document.createElement("li");
  li.innerHTML = feed.title;
  ul.appendChild(li);
});

document.getElementById("app").appendChild(ul);
