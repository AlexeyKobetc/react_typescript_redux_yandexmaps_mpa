import AboutPage from "../components/Pages/AboutPage";
import JsonPlaceHolderPage from "../components/Pages/JsonPlaceHolderPage";
import MainPage from "../components/Pages/MainPage";
import MeteoPage from "../components/Pages/MeteoPage";
import { IActivePath, IJsonPostsStore, IMeteoStore, IPages } from "./types/interfaces";

export const pages: IPages = {
  Главная: {
    path: "/",
    component: MainPage,
    isExact: true,
    isActive: true
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

export const activePath: IActivePath = { activePath: "/" };

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
