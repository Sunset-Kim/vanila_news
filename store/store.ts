import { observable } from "../utils/observer";

export const store = {
  state: observable({
    currentPage: 1,
    feeds: undefined,
  }),

  setState(newState: any) {
    console.log("new", newState);
    for (const [key, value] of Object.entries(newState)) {
      this.state[key] = value;
    }
  },
};
