import AboutPage from "../components/Pages/AboutPage";
import JsonPlaceHolderPage from "../components/Pages/JsonPlaceHolderPage";
import MainPage from "../components/Pages/MainPage";
import MeteoPage from "../components/Pages/MeteoPage";
import YandexMapsPage from "../components/Pages/YandexMapsPage";
import {
  IActivePath,
  IGeoMarker,
  IJsonPostsStore,
  IMeteoStore,
  IPages,
  IYMData,
  IYMStore
} from "./types/interfaces";

const pages: IPages = {
  Главная: {
    path: "/",
    component: MainPage,
    isExact: true,
    isActive: true
  },
  "Yandex Maps": {
    path: "/ymaps",
    component: YandexMapsPage,
    isExact: false,
    isActive: false
  },
  "{JSON} Placeholder": {
    path: "/json",
    component: JsonPlaceHolderPage,
    isExact: false,
    isActive: false
  },

  "Open Weather": {
    path: "/meteo",
    component: MeteoPage,
    isExact: false,
    isActive: false
  }
  // ,
  // Описание: {
  //   path: "/about",
  //   component: AboutPage,
  //   isExact: false,
  //   isActive: false
  // }
};

const activePath: IActivePath = { activePath: "/" };

export const pagesInit = {
  pages,
  activePath
};

export const meteoInit: IMeteoStore = {
  countMeteoCellsOnScreen: 1,
  currentMeteoData: { temp: 0, deg: 0, speed: 0, description: "", icon: "" },
  fiveDayMeteoData: [],
  isFiveDayMeteoLoad: null,
  isCurrentMeteoLoad: null
};

export const jsonpostsInit: IJsonPostsStore = {
  jsonposts: [],
  postsCounts: {
    lenOfPostsLoadPortion: 10,
    currentCountFetchedPosts: 0
  },
  isPostsLoad: null
};

const ymData: IYMData = {
  defaultPosition: {
    coordinates: { latitude: 56.85, longitude: 60.65 },
    address: {
      region: "Россия, Свердловская область, Екатеринбург",
      fullAddress:
        "Россия, Свердловская область, Екатеринбург, Кировский район, микрорайон Втузгородок, Академическая улица, 16",
      shortAddress: "Академическая улица, 16"
    }
  },
  userPosition: {
    coordinates: { longitude: 0, latitude: 0 },
    address: {
      region: "",
      fullAddress: "",
      shortAddress: ""
    }
  },
  destinationPosition: {
    coordinates: { longitude: 0, latitude: 0 },
    address: {
      region: "",
      fullAddress: "",
      shortAddress: ""
    }
  }
};

export const ymInit: IYMStore = {
  ymData
};
