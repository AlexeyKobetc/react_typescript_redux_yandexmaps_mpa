import { jsonpostsInit } from "../initialStore";
import { IAction, IJsonPostsStore } from "../types/interfaces";

export const jsonpostsReducer = (state: IJsonPostsStore = jsonpostsInit, action: IAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
