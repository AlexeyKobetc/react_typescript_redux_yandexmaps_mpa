import {
  EYmData,
  IAddress,
  ICoordinates,
  IFiveDayMeteoListElement,
  IMeteoElement,
  IPost
} from "./interfaces";

export enum EPagesActions {
  SET_ACTIVE_PATH = "SET_ACTIVE_PATH"
}

interface ISetActivePageAction {
  type: typeof EPagesActions.SET_ACTIVE_PATH;
  payload: string;
}

export type TPageAction = ISetActivePageAction;

export enum EMeteoActions {
  START_CURRENT_METEO_DATA_LOAD = "START_CURRENT_METEO_DATA_LOAD",
  SUCCESS_CURRENT_METEO_DATA_LOAD = "SUCCESS_CURRENT_METEO_DATA_LOAD",
  FAILURE_CURRENT_METEO_DATA_LOAD = "FAILURE_CURRENT_METEO_DATA_LOAD",

  START_FIVEDAY_METEO_DATA_LOAD = "START_FIVEDAY_METEO_DATA_LOAD",
  SUCCESS_FIVEDAY_METEO_DATA_LOAD = "SUCCESS_FIVEDAY_METEO_DATA_LOAD",
  FAILURE_FIVEDAY_METEO_DATA_LOAD = "FAILURE_FIVEDAY_METEO_DATA_LOAD",

  SET_COUNT_METEO_CELLS_ON_SCREEN = "SET_COUNT_METEO_CELLS_ON_SCREEN"
}

interface ISetCountMeteoCellsOnScreen {
  type: typeof EMeteoActions.SET_COUNT_METEO_CELLS_ON_SCREEN;
  payload: number;
}

interface IStartCurrentMeteoDataLoad {
  type: typeof EMeteoActions.START_CURRENT_METEO_DATA_LOAD;
}

interface ISuccessCurrentMeteoDataLoad {
  type: typeof EMeteoActions.SUCCESS_CURRENT_METEO_DATA_LOAD;
  payload: IMeteoElement;
}

interface IFailureCurrentMeteoDataLoad {
  type: typeof EMeteoActions.FAILURE_CURRENT_METEO_DATA_LOAD;
}

interface IStartFiveDayMeteoDataLoad {
  type: typeof EMeteoActions.START_FIVEDAY_METEO_DATA_LOAD;
}
interface ISuccessFiveDayMeteoDataLoad {
  type: typeof EMeteoActions.SUCCESS_FIVEDAY_METEO_DATA_LOAD;
  payload: IFiveDayMeteoListElement[];
}

interface IFailureFiveDayMeteoDataLoad {
  type: typeof EMeteoActions.FAILURE_FIVEDAY_METEO_DATA_LOAD;
}

export type TMeteoAction =
  | ISetCountMeteoCellsOnScreen
  | IStartCurrentMeteoDataLoad
  | ISuccessCurrentMeteoDataLoad
  | IFailureCurrentMeteoDataLoad
  | IStartFiveDayMeteoDataLoad
  | ISuccessFiveDayMeteoDataLoad
  | IFailureFiveDayMeteoDataLoad;

export enum EJsonPostsActions {
  START_JSON_POSTS_DATA_LOAD = "START_JSON_POST_DATA_LOAD",
  SUCCESS_JSON_POSTS_DATA_LOAD = "SUCCESS_JSON_POST_DATA_LOAD",
  FAILURE_JSON_POSTS_DATA_LOAD = "FAILURE_JSON_POST_DATA_LOAD",

  SET_COUNT_FETCHED_JSON_POSTS = "SET_COUNT_FETCHED_JSON_POSTS"
}

interface ISetCountFetchedPosts {
  type: typeof EJsonPostsActions.SET_COUNT_FETCHED_JSON_POSTS;
  payload: number;
}

interface IStartJsonPostsDataLoad {
  type: typeof EJsonPostsActions.START_JSON_POSTS_DATA_LOAD;
}

interface ISuccessJsonPostsDataLoad {
  type: typeof EJsonPostsActions.SUCCESS_JSON_POSTS_DATA_LOAD;
  payload: IPost;
}

interface IFailureJsonPostsDataLoad {
  type: typeof EJsonPostsActions.FAILURE_JSON_POSTS_DATA_LOAD;
}

export type TJsonPostsAction =
  | ISetCountFetchedPosts
  | IStartJsonPostsDataLoad
  | ISuccessJsonPostsDataLoad
  | IFailureJsonPostsDataLoad;

export enum EYandexMapsActions {
  START_YM_SCRIPT_LOAD = "START_YM_SCRIPT_LOAD",
  SUCCESS_YM_SCRIPT_LOAD = "SUCCESS_YM_SCRIPT_LOAD",
  FAILURE_YM_SCRIPT_LOAD = "FAILURE_YM_SCRIPT_LOAD",
  ALREADY_YM_SCRIPT_LOADED = "ALREADY_YM_SCRIPT_LOADED",

  START_YM_API_INIT = "START_YM_API_INIT",
  SUCCESS_YM_API_INIT = "SUCCESS_YM_API_INIT",
  FAILURE_YM_API_INIT = "FAILURE_YM_API_INIT",

  YM_CREATE = "YM_CREATE",
  YM_DELETE = "YM_DELETE",
  YM_READY = "YM_READY",

  SAVE_POSITION = "SAVE_POSITION"
}

interface ISavePosition {
  type: typeof EYandexMapsActions.SAVE_POSITION;
  payload: { coordinates: ICoordinates; address: IAddress; namePosition: EYmData };
}

interface IStartYmScriptLoad {
  type: typeof EYandexMapsActions.START_YM_SCRIPT_LOAD;
}

interface ISuccessYmScriptLoad {
  type: typeof EYandexMapsActions.SUCCESS_YM_SCRIPT_LOAD;
}

interface IFailureYmScriptLoad {
  type: typeof EYandexMapsActions.FAILURE_YM_SCRIPT_LOAD;
}

interface IAlreadyYmScriptLoad {
  type: typeof EYandexMapsActions.ALREADY_YM_SCRIPT_LOADED;
}

interface IStartYmApiInit {
  type: typeof EYandexMapsActions.START_YM_API_INIT;
}

interface ISuccessYmApiInit {
  type: typeof EYandexMapsActions.SUCCESS_YM_API_INIT;
}

interface IFailureYmApiInit {
  type: typeof EYandexMapsActions.FAILURE_YM_API_INIT;
}

interface IYmCreate {
  type: typeof EYandexMapsActions.YM_CREATE;
  payload: any;
}

interface IYmDelete {
  type: typeof EYandexMapsActions.YM_DELETE;
}

interface IYmReady {
  type: typeof EYandexMapsActions.YM_READY;
  payload: boolean;
}

export type TYmAction =
  | ISavePosition
  | IStartYmScriptLoad
  | ISuccessYmScriptLoad
  | IFailureYmScriptLoad
  | IAlreadyYmScriptLoad
  | IStartYmApiInit
  | ISuccessYmApiInit
  | IFailureYmApiInit
  | IYmCreate
  | IYmDelete
  | IYmReady;
