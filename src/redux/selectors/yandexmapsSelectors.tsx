import { IAddress, IAppStore, IButtons, ICoordinates, IInputs } from "../types/interfaces";

export const ymInputs = (store: IAppStore): IInputs => store.yandexmaps.ymInputs;
export const ymButtons = (store: IAppStore): IButtons => store.yandexmaps.ymButtons;

export const isSetUserPosition = (store: IAppStore): boolean =>
  store.yandexmaps.ymData.userPosition.coordinates.latitude !== 0 &&
  store.yandexmaps.ymData.userPosition.coordinates.longitude !== 0 &&
  store.yandexmaps.ymData.userPosition.address.fullAddress !== "" &&
  store.yandexmaps.ymData.userPosition.address.region !== "" &&
  store.yandexmaps.ymData.userPosition.address.shortAddress !== "";

export const isSetDestinationPosition = (store: IAppStore): boolean =>
  store.yandexmaps.ymData.destinationPosition.coordinates.latitude !== 0 &&
  store.yandexmaps.ymData.destinationPosition.coordinates.longitude !== 0 &&
  store.yandexmaps.ymData.destinationPosition.address.fullAddress !== "" &&
  store.yandexmaps.ymData.destinationPosition.address.region !== "" &&
  store.yandexmaps.ymData.destinationPosition.address.shortAddress !== "";

export const getCurrentCoordinates = (store: IAppStore): ICoordinates =>
  store.yandexmaps.ymData.userPosition.coordinates.latitude &&
  store.yandexmaps.ymData.userPosition.coordinates.longitude
    ? store.yandexmaps.ymData.userPosition.coordinates
    : store.yandexmaps.ymData.defaultPosition.coordinates;

export const getCurrentAddress = (store: IAppStore): IAddress =>
  store.yandexmaps.ymData.userPosition.address.fullAddress &&
  store.yandexmaps.ymData.userPosition.address.region &&
  store.yandexmaps.ymData.userPosition.address.shortAddress
    ? store.yandexmaps.ymData.userPosition.address
    : store.yandexmaps.ymData.defaultPosition.address;

export const getDestinationCoordinates = (store: IAppStore): ICoordinates =>
  store.yandexmaps.ymData.destinationPosition.coordinates.latitude &&
  store.yandexmaps.ymData.destinationPosition.coordinates.longitude
    ? store.yandexmaps.ymData.destinationPosition.coordinates
    : store.yandexmaps.ymData.defaultPosition.coordinates;

export const getDestinationAddress = (store: IAppStore): IAddress =>
  store.yandexmaps.ymData.destinationPosition.address.fullAddress &&
  store.yandexmaps.ymData.destinationPosition.address.region &&
  store.yandexmaps.ymData.destinationPosition.address.shortAddress
    ? store.yandexmaps.ymData.destinationPosition.address
    : store.yandexmaps.ymData.defaultPosition.address;

export const getDefaultRegion = (store: IAppStore): string =>
  store.yandexmaps.ymData.defaultPosition.address.region;
