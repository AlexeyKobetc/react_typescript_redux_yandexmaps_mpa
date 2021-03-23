import {
    IAppState,
    IFiveDayMeteoListElement,
    IMeteoElement,
} from '../types/interfaces';

export const getCurrentMeteo = (state: IAppState): IMeteoElement =>
    state.meteo.currentMeteoData;
export const getFiveDayMeteo = (state: IAppState): IFiveDayMeteoListElement[] =>
    state.meteo.fiveDayMeteoData.slice(0, getCountMeteoCellsOnScreen(state));
export const isCurrentMeteoLoad = (state: IAppState): boolean | null =>
    state.meteo.isCurrentMeteoLoad;
export const isFiveDayMeteoLoad = (state: IAppState): boolean | null =>
    state.meteo.isFiveDayMeteoLoad;
export const getCountMeteoCellsOnScreen = (state: IAppState): number =>
    state.meteo.countMeteoCellsOnScreen;
