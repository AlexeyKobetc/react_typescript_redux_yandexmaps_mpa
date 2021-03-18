export interface IAction {
  type: string;
  payload?: any;
}

export interface IAppStore {
  pages: IPagesStore;
  meteo: IMeteoStore;
  jsonposts: IJsonPostsStore;
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
