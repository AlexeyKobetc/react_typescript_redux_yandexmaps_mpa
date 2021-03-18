import {
  IAction,
  ICurrentMeteoFetchedData,
  IFiveDayMeteoFetchedData,
  IFiveDayMeteoListElement,
  IMeteoElement
} from "../types/interfaces";
import { EMeteoActions } from "../types/types";

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

export const setCountMeteoCellsOnScreen = (countMeteoCellsOnScreen: number): IAction => ({
  type: EMeteoActions.SET_COUNT_METEO_CELLS_ON_SCREEN,
  payload: countMeteoCellsOnScreen
});

export const loadCurrentMeteo = () => {
  return (dispatch: any) => {
    dispatch({
      type: EMeteoActions.START_CURRENT_METEO_DATA_LOAD
    });
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
          dispatch({
            type: EMeteoActions.SUCCESS_CURRENT_METEO_DATA_LOAD,
            payload: meteoElement
          });
        } else {
          dispatch({
            type: EMeteoActions.FAILURE_CURRENT_METEO_DATA_LOAD
          });
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
        dispatch({
          type: EMeteoActions.FAILURE_CURRENT_METEO_DATA_LOAD
        });
      });
  };
};

export const loadFiveDayMeteo = () => {
  return (dispatch: any) => {
    dispatch({
      type: EMeteoActions.START_FIVEDAY_METEO_DATA_LOAD
    });
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
          dispatch({
            type: EMeteoActions.SUCCESS_FIVEDAY_METEO_DATA_LOAD,
            payload: fiveDayMeteo
          });
        } else {
          dispatch({
            type: EMeteoActions.FAILURE_FIVEDAY_METEO_DATA_LOAD
          });
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
        dispatch({
          type: EMeteoActions.FAILURE_FIVEDAY_METEO_DATA_LOAD
        });
      });
  };
};
