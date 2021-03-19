import { ymInit } from "../initialStore";
import { IYMStore } from "../types/interfaces";
import { EYandexMapsActions, TYmAction } from "../types/types";

export const yandexmapsReducer = (state: IYMStore = ymInit, action: TYmAction) => {
  switch (action.type) {
    case EYandexMapsActions.START_YM_SCRIPT_LOAD:
      return { ...state, isYmScriptLoad: false };

    case EYandexMapsActions.SUCCESS_YM_SCRIPT_LOAD:
      return { ...state, isYmScriptLoad: true };

    case EYandexMapsActions.FAILURE_YM_SCRIPT_LOAD:
      return { ...state, isYmScriptLoad: false };

    case EYandexMapsActions.START_YM_API_INIT:
      return { ...state, isYmApiReady: false };

    case EYandexMapsActions.SUCCESS_YM_API_INIT:
      return { ...state, isYmApiReady: true };

    case EYandexMapsActions.FAILURE_YM_API_INIT:
      return { ...state, isYmApiReady: false };

    case EYandexMapsActions.YM_DELETE:
      return { ...state, ym: null };

    case EYandexMapsActions.YM_CREATE:
      return { ...state, ym: action.payload };

    case EYandexMapsActions.YM_READY:
      return { ...state, isYmReady: action.payload };

    case EYandexMapsActions.SAVE_POSITION:
      const { namePosition, coordinates, address } = action.payload;
      return {
        ...state,
        ymData: {
          ...state.ymData,
          [namePosition]: { coordinates, address }
        }
      };

    default:
      return state;
  }
};
