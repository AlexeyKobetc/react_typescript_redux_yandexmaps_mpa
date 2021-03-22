import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    IAppStore,
    unknown,
    Action<string>
>;

export interface IAppStore {
    pages: IPagesStore;
    meteo: IMeteoStore;
    jsonposts: IJsonPostsStore;
    yandexmaps: IYMStore;
}

export interface IYMStore {
    ymData: IYMData;
    ymInputs: IInputs;
    ymButtons: IButtons;
}

export interface ICoordinates {
    latitude: number;
    longitude: number;
}

export interface IAddress {
    region: string;
    fullAddress: string;
    shortAddress: string;
}

export interface IPosition {
    coordinates: ICoordinates;
    address: IAddress;
}

export interface IGeoMarker {
    ymGeoMarker: any;
    icon: string;
    id: string;
    labelTextHeader: string;
}

export interface IYMData {
    defaultPosition: { coordinates: ICoordinates; address: IAddress };
    userPosition: { coordinates: ICoordinates; address: IAddress };
    destinationPosition: { coordinates: ICoordinates; address: IAddress };
}

export enum EYmData {
    DEFAULT_POSITION = 'defaultPosition',
    USER_POSITION = 'userPosition',
    DESTINATION_POSITION = 'destinationPosition',
}

export interface IPagesStore {
    pages: IPages;
    activePath: IActivePath;
}

export interface IMeteoStore {
    countMeteoCellsOnScreen: number;
    currentMeteoData: IMeteoElement;
    fiveDayMeteoData: IFiveDayMeteoListElement[];
    isFiveDayMeteoLoad: boolean | null;
    isCurrentMeteoLoad: boolean | null;
}

export interface IJsonPostsStore {
    jsonposts: IPost[];
    postsCounts: {
        lenOfPostsLoadPortion: number;
        currentCountFetchedPosts: number;
    };
    isPostsLoad: boolean | null;
}

export interface IActivePath {
    activePath: string;
}

export interface IPages {
    [name: string]: IPage;
}

export interface IPage {
    path: string;
    component: any;
    isExact: boolean;
    isActive: boolean;
}

export interface IMeteoMain {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
}

export interface IMeteoWeather {
    description: string;
    icon: string;
}

export interface IMeteoWind {
    deg: number;
    speed: number;
}

export interface ICurrentMeteoFetchedData {
    cod: number;
    main: IMeteoMain;
    weather: IMeteoWeather[];
    wind: IMeteoWind;
}

export interface IFiveDayMeteoListElement {
    dt_txt: string;
    main: IMeteoMain;
    weather: IMeteoWeather[];
    wind: IMeteoWind;
}

export interface IFiveDayMeteoFetchedData {
    cod: string;
    list: IFiveDayMeteoListElement[];
}

export interface IMeteoElement {
    temp: number;
    description: string;
    icon: string;
    deg?: number;
    speed?: number;
    feels_like?: number;
    humidity?: number;
    pressure?: number;
}

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
    user: IUser;
    comments: IComment[];
}

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface IUser {
    id: number;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: { lat: string; lng: string };
    };
    company: { name: string; catchPhrase: string; bs: string };
    email: string;
    name: string;
    phone: string;
    username: string;
    website: string;
}

export interface IInputs {
    [name: string]: IInput;
}

export interface IInput {
    textarea: boolean;
    labelText: string;
    placeHolder: string;
    helpText: string;
    errorLabel: string;
    value: string;
    isValid: boolean | null;
    isDisable: boolean;
    maxLen: number;
    regEx: RegExp[];
    isYandex: boolean;
}

export interface IButtons {
    [name: string]: IButton;
}

export interface IButton {
    labelText: string;
    disabled: boolean;
}
