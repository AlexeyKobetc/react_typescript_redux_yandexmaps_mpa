import { pagesInit } from "../initialStore";
import { IAction, IPagesStore } from "../types/interfaces";
import { EPagesActions } from "../types/types";

export const pageReducer = (state: IPagesStore = pagesInit, action: IAction) => {
  switch (action.type) {
    case EPagesActions.SET_ACTIVE_PATH:
      return { ...state, activePath: { activePath: action.payload } };
    default:
      return state;
  }
};
