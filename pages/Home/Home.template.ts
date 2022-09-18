export const homeTemplate = `
<div class="bg-gray-800 mx-auto mb-4 px-2 py-1 sm:px-6 lg:px-8 xl:px-10">
  <h1 class="text-white text-2xl	 font-bold">Hacker News</h1>
</div>

<div class="mx-auto px-2 sm:px-6 lg:px-8 xl:px-10">
  <div class="flex gap-4 max-w-md mx-auto md:max-w-2xl mb-4 items-center">
  <div class="flex gap-1">
    <a href="#/page/{{__prev_page__}}">
      <div class="flex h-10 w-10 transition-colors	 hover:bg-indigo-700 items-center justify-center rounded-md bg-indigo-500 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </div>            
    </a>
    <a href="#/page/{{__next_page__}}">
      <div class="flex h-10 w-10 transition-colors	 hover:bg-indigo-700 items-center justify-center rounded-md bg-indigo-500 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </a>
  </div>

  <p class="text-base text-slate-600 font-bold">
    {{__current_page__}} / {{__total_page__}}
  </p>
  </div>

  <ul class="space-y-2 mb-4">
    {{__news_feed__}}
  </ul>

</div>
`;
