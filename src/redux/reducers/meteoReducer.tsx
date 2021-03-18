import { meteoInit } from "../initialStore";
import { IAction, IMeteoStore } from "../types/interfaces";
import { EMeteoActions } from "../types/types";

export const meteoReducer = (state: IMeteoStore = meteoInit, action: IAction) => {
  switch (action.type) {
    case EMeteoActions.SET_COUNT_METEO_CELLS_ON_SCREEN:
      return { ...state, countMeteoCellsOnScreen: action.payload };

    case EMeteoActions.SUCCESS_CURRENT_METEO_DATA_LOAD:
      return { ...state, currentMeteoData: action.payload, isCurrentMeteoLoad: true };

    case EMeteoActions.FAILURE_CURRENT_METEO_DATA_LOAD:
      return { ...state, isCurrentMeteoLoad: false };

    case EMeteoActions.SUCCESS_FIVEDAY_METEO_DATA_LOAD:
      return { ...state, fiveDayMeteoData: action.payload, isFiveDayMeteoLoad: true };

    case EMeteoActions.FAILURE_FIVEDAY_METEO_DATA_LOAD:
      return { ...state, isFiveDayMeteoLoad: false };

    default:
      return state;
  }
};
