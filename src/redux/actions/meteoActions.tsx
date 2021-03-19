import {
  AppThunk,
  ICurrentMeteoFetchedData,
  IFiveDayMeteoFetchedData,
  IFiveDayMeteoListElement,
  IMeteoElement
} from "../types/interfaces";
import { EMeteoActions, TMeteoAction } from "../types/types";

const fiveDayMeteoUrl =
  "http://api.openweathermap.org/data/2.5/forecast?lat=44.89&lon=37.32&units=metric&lang=ru&appid=99f8ef29cc8ec4480788db0433e36c0c";
const currentMeteoUrl =
  "http://api.openweathermap.org/data/2.5/weather?lat=44.89&lon=37.32&units=metric&lang=ru&appid=99f8ef29cc8ec4480788db0433e36c0c";

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Response Not OK");
  }

  return await response.json();
}

export const loadCurrentMeteo = (): AppThunk => {
  return (dispatch: any) => {
    dispatch(startCurrentMeteoDataLoad());
    getData<ICurrentMeteoFetchedData>(currentMeteoUrl)
      .then(currentMeteoData => {
        const {
          cod,
          main: { temp, feels_like, pressure, humidity },
          wind: { deg, speed },
          weather
        } = currentMeteoData;
        const { description, icon } = weather[0];

        if (
          cod === 200 &&
          temp &&
          description &&
          icon &&
          deg &&
          speed &&
          feels_like &&
          humidity &&
          pressure
        ) {
          let meteoElement: IMeteoElement = {
            temp: Math.round(temp),
            description,
            icon: "http://openweathermap.org/img/wn/" + icon + "@2x.png",
            deg,
            speed,
            feels_like,
            humidity,
            pressure
          };
          dispatch(successCurrentMeteoDataLoad(meteoElement));
        } else {
          dispatch(failureCurrentMeteoDataLoad());
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
        dispatch(failureCurrentMeteoDataLoad());
      });
  };
};

export const loadFiveDayMeteo = (): AppThunk => {
  return (dispatch: any) => {
    dispatch(startFiveDayMeteoDataLoad());
    getData<IFiveDayMeteoFetchedData>(fiveDayMeteoUrl)
      .then(fiveDayMeteoData => {
        const { cod, list } = fiveDayMeteoData;
        if (cod === "200" && list.length) {
          let fiveDayMeteo: IFiveDayMeteoListElement[] = list.filter(
            (weather: IFiveDayMeteoListElement) =>
              weather.dt_txt.indexOf("00:00:00") !== -1 ||
              weather.dt_txt.indexOf("06:00:00") !== -1 ||
              weather.dt_txt.indexOf("12:00:00") !== -1 ||
              weather.dt_txt.indexOf("18:00:00") !== -1
          );
          dispatch(successFiveDayMeteoDataLoad(fiveDayMeteo));
        } else {
          dispatch(failureFiveDayMeteoDataLoad());
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
        dispatch(failureFiveDayMeteoDataLoad());
      });
  };
};

export const setCountMeteoCellsOnScreen = (countMeteoCellsOnScreen: number): TMeteoAction => ({
  type: EMeteoActions.SET_COUNT_METEO_CELLS_ON_SCREEN,
  payload: countMeteoCellsOnScreen
});

const startCurrentMeteoDataLoad = (): TMeteoAction => ({
  type: EMeteoActions.START_CURRENT_METEO_DATA_LOAD
});

const successCurrentMeteoDataLoad = (currentMeteoMeteo: IMeteoElement): TMeteoAction => ({
  type: EMeteoActions.SUCCESS_CURRENT_METEO_DATA_LOAD,
  payload: currentMeteoMeteo
});

const failureCurrentMeteoDataLoad = (): TMeteoAction => ({
  type: EMeteoActions.FAILURE_CURRENT_METEO_DATA_LOAD
});

const startFiveDayMeteoDataLoad = (): TMeteoAction => ({
  type: EMeteoActions.START_FIVEDAY_METEO_DATA_LOAD
});

const successFiveDayMeteoDataLoad = (fiveDayMeteo: IFiveDayMeteoListElement[]): TMeteoAction => ({
  type: EMeteoActions.SUCCESS_FIVEDAY_METEO_DATA_LOAD,
  payload: fiveDayMeteo
});

const failureFiveDayMeteoDataLoad = (): TMeteoAction => ({
  type: EMeteoActions.FAILURE_FIVEDAY_METEO_DATA_LOAD
});
