import {
    IAddress,
    IAppState,
    IButtons,
    ICoordinates,
    IInputs,
} from '../types/interfaces';

export const ymInputs = (state: IAppState): IInputs =>
    state.yandexmaps.ymInputs;
export const ymButtons = (state: IAppState): IButtons =>
    state.yandexmaps.ymButtons;

export const isSetUserPosition = (state: IAppState): boolean =>
    state.yandexmaps.ymData.userPosition.coordinates.latitude !== 0 &&
    state.yandexmaps.ymData.userPosition.coordinates.longitude !== 0 &&
    state.yandexmaps.ymData.userPosition.address.fullAddress !== '' &&
    state.yandexmaps.ymData.userPosition.address.region !== '' &&
    state.yandexmaps.ymData.userPosition.address.shortAddress !== '';

export const isSetDestinationPosition = (state: IAppState): boolean =>
    state.yandexmaps.ymData.destinationPosition.coordinates.latitude !== 0 &&
    state.yandexmaps.ymData.destinationPosition.coordinates.longitude !== 0 &&
    state.yandexmaps.ymData.destinationPosition.address.fullAddress !== '' &&
    state.yandexmaps.ymData.destinationPosition.address.region !== '' &&
    state.yandexmaps.ymData.destinationPosition.address.shortAddress !== '';

export const getCurrentCoordinates = (state: IAppState): ICoordinates =>
    state.yandexmaps.ymData.userPosition.coordinates.latitude &&
    state.yandexmaps.ymData.userPosition.coordinates.longitude
        ? state.yandexmaps.ymData.userPosition.coordinates
        : state.yandexmaps.ymData.defaultPosition.coordinates;

export const getCurrentAddress = (state: IAppState): IAddress =>
    state.yandexmaps.ymData.userPosition.address.fullAddress &&
    state.yandexmaps.ymData.userPosition.address.region &&
    state.yandexmaps.ymData.userPosition.address.shortAddress
        ? state.yandexmaps.ymData.userPosition.address
        : state.yandexmaps.ymData.defaultPosition.address;

export const getDestinationCoordinates = (state: IAppState): ICoordinates =>
    state.yandexmaps.ymData.destinationPosition.coordinates.latitude &&
    state.yandexmaps.ymData.destinationPosition.coordinates.longitude
        ? state.yandexmaps.ymData.destinationPosition.coordinates
        : state.yandexmaps.ymData.defaultPosition.coordinates;

export const getDestinationAddress = (state: IAppState): IAddress =>
    state.yandexmaps.ymData.destinationPosition.address.fullAddress &&
    state.yandexmaps.ymData.destinationPosition.address.region &&
    state.yandexmaps.ymData.destinationPosition.address.shortAddress
        ? state.yandexmaps.ymData.destinationPosition.address
        : state.yandexmaps.ymData.defaultPosition.address;

export const getDefaultRegion = (state: IAppState): string =>
    state.yandexmaps.ymData.defaultPosition.address.region;
