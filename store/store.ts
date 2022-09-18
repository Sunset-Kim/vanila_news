import { NewsFeed } from "../services/hackerAPI";

import { observable } from "../utils/observer";

interface Store {
  currentPage?: null | number;
  feeds?: (NewsFeed & {
    isRead: boolean;
  })[];
}

export const store = {
  state: observable<Store>({}),

  setState(newState: Store) {
    for (const [key, value] of Object.entries(newState)) {
      this.state[key as keyof Store] = value;
    }
  },
};
