import { observable } from "../utils/observer";

export const store = {
  state: observable({
    currentPage: 1,
  }),

  setState(newState) {
    console.log("new", newState);
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};
