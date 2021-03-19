import { EPagesActions, TPageAction } from "../types/types";

export const setActivePath = (pathName: string): TPageAction => ({
  type: EPagesActions.SET_ACTIVE_PATH,
  payload: pathName
});
