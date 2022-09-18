import { NewsFeed } from "../services/hackerAPI";

import { observable } from "../utils/observer";

export interface Feed extends NewsFeed {
  isRead: boolean;
}
interface Store {
  currentPage: number;
  feeds?: Feed[];
}

export const store = {
  state: observable<Store>({
    currentPage: 1,
  }),

  setState(newState: Partial<Store>) {
    for (const [key, value] of Object.entries({ ...this.state, ...newState })) {
      this.state[key] = value;
    }
  },
};
