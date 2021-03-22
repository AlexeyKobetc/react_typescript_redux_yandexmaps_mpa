import {
    IAppStore,
    IFiveDayMeteoListElement,
    IMeteoElement,
} from '../types/interfaces';

export const getCurrentMeteo = (store: IAppStore): IMeteoElement =>
    store.meteo.currentMeteoData;
export const getFiveDayMeteo = (store: IAppStore): IFiveDayMeteoListElement[] =>
    store.meteo.fiveDayMeteoData.slice(0, getCountMeteoCellsOnScreen(store));
export const isCurrentMeteoLoad = (store: IAppStore): boolean | null =>
    store.meteo.isCurrentMeteoLoad;
export const isFiveDayMeteoLoad = (store: IAppStore): boolean | null =>
    store.meteo.isFiveDayMeteoLoad;
export const getCountMeteoCellsOnScreen = (store: IAppStore): number =>
    store.meteo.countMeteoCellsOnScreen;
