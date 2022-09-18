export const detailTemplate = `
<div class="bg-gray-800 mx-auto mb-4 px-2 py-1 sm:px-6 lg:px-8 xl:px-10">
  <h1 class="text-white text-2xl	font-bold">Hacker News</h1>
</div>

<div class="mx-auto px-2 sm:px-6 lg:px-8 xl:px-10">
<div class="max-w-md mx-auto md:max-w-2xl mb-4 items-center">
  <h1 class="text-lg font-bold mb-4">{{__title__}}</h1>

  <div class="mb-4 flex w-full justify-between">
    <span class="text-sm text-indigo-800">{{__user__}}</span>
    <span class="text-sm text-indigo-800">{{__time_ago__}}</span>
  </div>
  
  <div class="mb-4">
    {{__content__}}
  </div>

  <a class="mt-2 transition-colors inline-flex items-center h-9 rounded-md text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 focus:ring-indigo-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500" href="#/page/{{__current_page__}}">목록으로</a>

  <div class="mt-4">
    <h2 class="mb-2 font-semibold text-indigo-500 dark:text-indigo-400">Comments</h2>
    <div>
      {{__comments__}}
    </div>
  </div>
</div>
`;
