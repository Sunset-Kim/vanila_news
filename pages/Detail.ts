import hackerAPI from "../services/hackerAPI";
import { store } from "../store/store";

export default async function Detail(id) {
  const newsItem = await hackerAPI.getNewsItem(id);

  const comments = makeComments(newsItem.comments);

  store.setState({
    feeds: store.state.feeds.map((feed) => {
      console.log(feed.id == id);
      if (feed.id == id) {
        feed.isRead = true;
      }
      return feed;
    }),
  });

  return `
  <div class="bg-gray-800 mx-auto mb-4 px-2 py-1 sm:px-6 lg:px-8 xl:px-10">
    <h1 class="text-white text-2xl	font-bold">Hacker News</h1>
  </div>

  <div class="mx-auto px-2 sm:px-6 lg:px-8 xl:px-10">
  <div class="max-w-md mx-auto md:max-w-2xl mb-4 items-center">
    <h1 class="text-lg font-bold mb-4">${newsItem.title}</h1>

    <div class="mb-4 flex w-full justify-between">
      <span class="text-sm text-indigo-800">${newsItem.user}</span>
      <span class="text-sm text-indigo-800">${newsItem.time_ago}</span>
    </div>
    
    <div class="mb-4">
      ${newsItem.content}
    </div>

    <a class="mt-2 transition-colors inline-flex items-center h-9 rounded-md text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 focus:ring-indigo-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500" href="#/page/${store.state.currentPage}">목록으로</a>

    <div class="mt-4">
      <h2 class="mb-2 font-semibold text-indigo-500 dark:text-indigo-400">Comments</h2>
      <div>
        ${comments}
      </div>
    </div>
  </div>
  `;
}

const template = `
<div class="ml-{{__called__}}
last:after:border-l-0 after:z-[-1] after:content-[''] after:absolute after:left-[6px] after:top-0 after-border-[1px] after:h-full after:border-indigo-500 after:border-l-[1px]
before:content-[''] before:{{__first__}} before:z-[-10] before:absolute before:left-[-18px] before:top-[-8px] before:h-[35px] before:w-[16px] before:border-indigo-500 before:border-l-[1px] before:border-b-[1px]
relative z-10">

  <div class="relative z-10 pb-2">
    <div class="relative mb-2 py-2 px-6 bg-white rounded-md shadow-xl ring-1 ring-slate-900/5 divide-y divide-slate-100 my-auto xl:mt-18 dark:bg-slate-800 dark:divide-slate-200/5 dark:highlight-white/10">
      <div class="py-2">{{__contents__}}</div>
      <div class="py-2 flex w-full justify-between">
        <span class="text-sm text-indigo-800">{{__time__}}</span>
        <span class="text-sm text-indigo-800">{{__user__}}</span>
      </div>
    </div>

    {{__comments__}}
  </div>
</div>`;

function makeComments(commentsList, called = 0) {
  const result = [];

  for (let i = 0; i < commentsList.length; i++) {
    let comment = template;

    if (commentsList[i].comments.length > 0) {
      const innerComments = makeComments(commentsList[i].comments, called + 1);
      comment = comment.replace("{{__comments__}}", innerComments);
    } else {
      comment = comment.replace("{{__comments__}}", "");
    }

    comment = called ? comment.replace("{{__called__}}", 6) : comment.replace("{{__called__}}", 0);
    comment = called ? comment.replace("{{__first__}}", "") : comment.replace("{{__first__}}", "hidden");

    comment = comment.replace("{{__user__}}", commentsList[i].user);
    comment = comment.replace("{{__contents__}}", commentsList[i].content);
    comment = comment.replace("{{__time__}}", commentsList[i].time_ago);

    result.push(comment);
  }

  return result.join("");
}
