import { pagesInit } from "../initialStore";
import { IPagesStore } from "../types/interfaces";
import { EPagesActions, TPageAction } from "../types/types";

export const pageReducer = (state: IPagesStore = pagesInit, action: TPageAction) => {
  switch (action.type) {
    case EPagesActions.SET_ACTIVE_PATH:
      return { ...state, activePath: { activePath: action.payload } };
    default:
      return state;
  }
};
