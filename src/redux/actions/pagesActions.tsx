import { PagesActionsTypes, PagesActionType } from "../types/types";

export const setActivePath = (pathName: string): PagesActionType => ({
  type: PagesActionsTypes.SET_ACTIVE_PATH,
  payload: pathName
});
