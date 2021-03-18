import { IAction } from "../types/interfaces";
import { EPagesActions } from "../types/types";

export const setActivePath = (pathName: string): IAction => ({
  type: EPagesActions.SET_ACTIVE_PATH,
  payload: pathName
});
