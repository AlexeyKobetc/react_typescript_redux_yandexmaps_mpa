import { ymInit } from "../initialStore";
import { IYMStore } from "../types/interfaces";
import { YandexMapsActionsTypes, YmActionType } from "../types/types";

export const yandexmapsReducer = (state: IYMStore = ymInit, action: YmActionType) => {
  switch (action.type) {
    case YandexMapsActionsTypes.SAVE_POSITION:
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
