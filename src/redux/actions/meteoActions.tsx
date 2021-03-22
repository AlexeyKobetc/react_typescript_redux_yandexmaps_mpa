import { IFiveDayMeteoListElement, IMeteoElement } from '../types/interfaces';
import { MeteoActionsTypes, MeteoActionType } from '../types/types';

export const setCountMeteoCellsOnScreen = (
    countMeteoCellsOnScreen: number
): MeteoActionType => ({
    type: MeteoActionsTypes.SET_COUNT_METEO_CELLS_ON_SCREEN,
    payload: countMeteoCellsOnScreen,
});

export const startCurrentMeteoDataLoad = (): MeteoActionType => ({
    type: MeteoActionsTypes.START_CURRENT_METEO_DATA_LOAD,
});

export const successCurrentMeteoDataLoad = (
    currentMeteoMeteo: IMeteoElement
): MeteoActionType => ({
    type: MeteoActionsTypes.SUCCESS_CURRENT_METEO_DATA_LOAD,
    payload: currentMeteoMeteo,
});

export const failureCurrentMeteoDataLoad = (): MeteoActionType => ({
    type: MeteoActionsTypes.FAILURE_CURRENT_METEO_DATA_LOAD,
});

export const startFiveDayMeteoDataLoad = (): MeteoActionType => ({
    type: MeteoActionsTypes.START_FIVEDAY_METEO_DATA_LOAD,
});

export const successFiveDayMeteoDataLoad = (
    fiveDayMeteo: IFiveDayMeteoListElement[]
): MeteoActionType => ({
    type: MeteoActionsTypes.SUCCESS_FIVEDAY_METEO_DATA_LOAD,
    payload: fiveDayMeteo,
});

export const failureFiveDayMeteoDataLoad = (): MeteoActionType => ({
    type: MeteoActionsTypes.FAILURE_FIVEDAY_METEO_DATA_LOAD,
});
