import {
  EYmData,
  IAddress,
  ICoordinates,
  IFiveDayMeteoListElement,
  IMeteoElement,
  IPost
} from "./interfaces";

export enum PagesActionsTypes {
  SET_ACTIVE_PATH = "SET_ACTIVE_PATH"
}

interface ISetActivePageAction {
  type: typeof PagesActionsTypes.SET_ACTIVE_PATH;
  payload: string;
}

export type PagesActionType = ISetActivePageAction;

export enum MeteoActionsTypes {
  START_CURRENT_METEO_DATA_LOAD = "START_CURRENT_METEO_DATA_LOAD",
  SUCCESS_CURRENT_METEO_DATA_LOAD = "SUCCESS_CURRENT_METEO_DATA_LOAD",
  FAILURE_CURRENT_METEO_DATA_LOAD = "FAILURE_CURRENT_METEO_DATA_LOAD",

  START_FIVEDAY_METEO_DATA_LOAD = "START_FIVEDAY_METEO_DATA_LOAD",
  SUCCESS_FIVEDAY_METEO_DATA_LOAD = "SUCCESS_FIVEDAY_METEO_DATA_LOAD",
  FAILURE_FIVEDAY_METEO_DATA_LOAD = "FAILURE_FIVEDAY_METEO_DATA_LOAD",

  SET_COUNT_METEO_CELLS_ON_SCREEN = "SET_COUNT_METEO_CELLS_ON_SCREEN"
}

interface ISetCountMeteoCellsOnScreen {
  type: typeof MeteoActionsTypes.SET_COUNT_METEO_CELLS_ON_SCREEN;
  payload: number;
}

interface IStartCurrentMeteoDataLoad {
  type: typeof MeteoActionsTypes.START_CURRENT_METEO_DATA_LOAD;
}

interface ISuccessCurrentMeteoDataLoad {
  type: typeof MeteoActionsTypes.SUCCESS_CURRENT_METEO_DATA_LOAD;
  payload: IMeteoElement;
}

interface IFailureCurrentMeteoDataLoad {
  type: typeof MeteoActionsTypes.FAILURE_CURRENT_METEO_DATA_LOAD;
}

interface IStartFiveDayMeteoDataLoad {
  type: typeof MeteoActionsTypes.START_FIVEDAY_METEO_DATA_LOAD;
}
interface ISuccessFiveDayMeteoDataLoad {
  type: typeof MeteoActionsTypes.SUCCESS_FIVEDAY_METEO_DATA_LOAD;
  payload: IFiveDayMeteoListElement[];
}

interface IFailureFiveDayMeteoDataLoad {
  type: typeof MeteoActionsTypes.FAILURE_FIVEDAY_METEO_DATA_LOAD;
}

export type MeteoActionType =
  | ISetCountMeteoCellsOnScreen
  | IStartCurrentMeteoDataLoad
  | ISuccessCurrentMeteoDataLoad
  | IFailureCurrentMeteoDataLoad
  | IStartFiveDayMeteoDataLoad
  | ISuccessFiveDayMeteoDataLoad
  | IFailureFiveDayMeteoDataLoad;

export enum JsonPostsActionsTypes {
  START_JSON_POSTS_DATA_LOAD = "START_JSON_POST_DATA_LOAD",
  SUCCESS_JSON_POSTS_DATA_LOAD = "SUCCESS_JSON_POST_DATA_LOAD",
  FAILURE_JSON_POSTS_DATA_LOAD = "FAILURE_JSON_POST_DATA_LOAD",

  SET_COUNT_FETCHED_JSON_POSTS = "SET_COUNT_FETCHED_JSON_POSTS"
}

interface ISetCountFetchedPosts {
  type: typeof JsonPostsActionsTypes.SET_COUNT_FETCHED_JSON_POSTS;
  payload: number;
}

interface IStartJsonPostsDataLoad {
  type: typeof JsonPostsActionsTypes.START_JSON_POSTS_DATA_LOAD;
}

interface ISuccessJsonPostsDataLoad {
  type: typeof JsonPostsActionsTypes.SUCCESS_JSON_POSTS_DATA_LOAD;
  payload: IPost;
}

interface IFailureJsonPostsDataLoad {
  type: typeof JsonPostsActionsTypes.FAILURE_JSON_POSTS_DATA_LOAD;
}

export type JsonPostsActionType =
  | ISetCountFetchedPosts
  | IStartJsonPostsDataLoad
  | ISuccessJsonPostsDataLoad
  | IFailureJsonPostsDataLoad;

export enum YandexMapsActionsTypes {
  SAVE_POSITION = "SAVE_POSITION"
}

interface ISavePosition {
  type: typeof YandexMapsActionsTypes.SAVE_POSITION;
  payload: { coordinates: ICoordinates; address: IAddress; namePosition: EYmData };
}

export type YmActionType = ISavePosition;
