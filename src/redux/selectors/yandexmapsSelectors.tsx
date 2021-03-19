import { IAddress, IAppStore, ICoordinates } from "../types/interfaces";

export const getYmCurrentZoom = (store: IAppStore): number => store.yandexmaps.ymCurrentMapZoom;
export const getYm = (store: IAppStore): any => store.yandexmaps.ym;

export const isYmScriptLoad = (store: IAppStore): boolean | null => store.yandexmaps.isYmScriptLoad;
export const isYmApiReady = (store: IAppStore): boolean | null => store.yandexmaps.isYmApiReady;
export const isYmReady = (store: IAppStore): boolean | null => store.yandexmaps.isYmReady;

export const getCurrentCoordinates = (store: IAppStore): ICoordinates => {
  return store.yandexmaps.ymData.userPosition.coordinates.latitude &&
    store.yandexmaps.ymData.userPosition.coordinates.longitude
    ? store.yandexmaps.ymData.userPosition.coordinates
    : store.yandexmaps.ymData.defaultPosition.coordinates;
};

export const getCurrentAddress = (store: IAppStore): IAddress => {
  return store.yandexmaps.ymData.userPosition.address.fullAddress &&
    store.yandexmaps.ymData.userPosition.address.region &&
    store.yandexmaps.ymData.userPosition.address.shortAddress
    ? store.yandexmaps.ymData.userPosition.address
    : store.yandexmaps.ymData.defaultPosition.address;
};

export const getDestinationCoordinates = (store: IAppStore): ICoordinates => {
  return store.yandexmaps.ymData.destinationPosition.coordinates.latitude &&
    store.yandexmaps.ymData.destinationPosition.coordinates.longitude
    ? store.yandexmaps.ymData.destinationPosition.coordinates
    : store.yandexmaps.ymData.defaultPosition.coordinates;
};

export const getDestinationAddress = (store: IAppStore): IAddress => {
  return store.yandexmaps.ymData.destinationPosition.address.fullAddress &&
    store.yandexmaps.ymData.destinationPosition.address.region &&
    store.yandexmaps.ymData.destinationPosition.address.shortAddress
    ? store.yandexmaps.ymData.destinationPosition.address
    : store.yandexmaps.ymData.defaultPosition.address;
};
