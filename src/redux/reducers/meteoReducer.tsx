import { meteoInit } from "../initialStore";
import { IMeteoStore } from "../types/interfaces";
import { MeteoActionsTypes, MeteoActionType } from "../types/types";

export const meteoReducer = (state: IMeteoStore = meteoInit, action: MeteoActionType) => {
  switch (action.type) {
    case MeteoActionsTypes.SET_COUNT_METEO_CELLS_ON_SCREEN:
      return { ...state, countMeteoCellsOnScreen: action.payload };

    case MeteoActionsTypes.SUCCESS_CURRENT_METEO_DATA_LOAD:
      return { ...state, currentMeteoData: action.payload, isCurrentMeteoLoad: true };

    case MeteoActionsTypes.FAILURE_CURRENT_METEO_DATA_LOAD:
      return { ...state, isCurrentMeteoLoad: false };

    case MeteoActionsTypes.SUCCESS_FIVEDAY_METEO_DATA_LOAD:
      return { ...state, fiveDayMeteoData: action.payload, isFiveDayMeteoLoad: true };

    case MeteoActionsTypes.FAILURE_FIVEDAY_METEO_DATA_LOAD:
      return { ...state, isFiveDayMeteoLoad: false };

    default:
      return state;
  }
};
