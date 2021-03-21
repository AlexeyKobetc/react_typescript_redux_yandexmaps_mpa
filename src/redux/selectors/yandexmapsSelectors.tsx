import { IAddress, IAppStore, ICoordinates, IPosition } from "../types/interfaces";

export const isSetUserPosition = (store: IAppStore): boolean => {
  return (
    store.yandexmaps.ymData.userPosition.coordinates.latitude !== 0 &&
    store.yandexmaps.ymData.userPosition.coordinates.longitude !== 0 &&
    store.yandexmaps.ymData.userPosition.address.fullAddress !== "" &&
    store.yandexmaps.ymData.userPosition.address.region !== "" &&
    store.yandexmaps.ymData.userPosition.address.shortAddress !== ""
  );
};

export const isSetDestinationPosition = (store: IAppStore): boolean => {
  return (
    store.yandexmaps.ymData.destinationPosition.coordinates.latitude !== 0 &&
    store.yandexmaps.ymData.destinationPosition.coordinates.longitude !== 0 &&
    store.yandexmaps.ymData.destinationPosition.address.fullAddress !== "" &&
    store.yandexmaps.ymData.destinationPosition.address.region !== "" &&
    store.yandexmaps.ymData.destinationPosition.address.shortAddress !== ""
  );
};

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
