import {
    failureCurrentMeteoDataLoad,
    failureFiveDayMeteoDataLoad,
    startCurrentMeteoDataLoad,
    startFiveDayMeteoDataLoad,
    successCurrentMeteoDataLoad,
    successFiveDayMeteoDataLoad,
} from '../redux/actions/meteoActions';

import { store } from '../redux/Store';
import {
    IAppStore,
    ICurrentMeteoFetchedData,
    IFiveDayMeteoFetchedData,
    IFiveDayMeteoListElement,
    IMeteoElement,
} from '../redux/types/interfaces';

const fiveDayMeteoUrl =
    'http://api.openweathermap.org/data/2.5/forecast?lat=44.89&lon=37.32&units=metric&lang=ru&appid=99f8ef29cc8ec4480788db0433e36c0c';
const currentMeteoUrl =
    'http://api.openweathermap.org/data/2.5/weather?lat=44.89&lon=37.32&units=metric&lang=ru&appid=99f8ef29cc8ec4480788db0433e36c0c';

async function getData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Response Not OK');
    }

    return await response.json();
}

class OpenMeteo {
    constructor() {
        this.loadCurrentMeteo();
        this.loadFiveDayMeteo();
    }

    public loadMeteoData = () => {};

    protected loadCurrentMeteo = () => {
        store.dispatch(startCurrentMeteoDataLoad());

        getData<ICurrentMeteoFetchedData>(currentMeteoUrl)
            .then(currentMeteoData => {
                const {
                    cod,
                    main: { temp, feels_like, pressure, humidity },
                    wind: { deg, speed },
                    weather,
                } = currentMeteoData;
                const { description, icon } = weather[0];

                if (cod === 200 && temp && description && icon) {
                    let meteoElement: IMeteoElement = {
                        temp: Math.round(temp),
                        description,
                        icon:
                            'http://openweathermap.org/img/wn/' +
                            icon +
                            '@2x.png',
                        deg,
                        speed,
                        feels_like,
                        humidity,
                        pressure,
                    };
                    store.dispatch(successCurrentMeteoDataLoad(meteoElement));
                } else {
                    store.dispatch(failureCurrentMeteoDataLoad());
                }
            })
            .catch((error: Error) => {
                console.log(error.message);
                store.dispatch(failureCurrentMeteoDataLoad());
            });
    };

    private loadFiveDayMeteo = () => {
        store.dispatch(startFiveDayMeteoDataLoad());
        getData<IFiveDayMeteoFetchedData>(fiveDayMeteoUrl)
            .then(fiveDayMeteoData => {
                const { cod, list } = fiveDayMeteoData;
                if (cod === '200' && list.length) {
                    let fiveDayMeteo: IFiveDayMeteoListElement[] = list.filter(
                        (weather: IFiveDayMeteoListElement) =>
                            weather.dt_txt.indexOf('00:00:00') !== -1 ||
                            weather.dt_txt.indexOf('06:00:00') !== -1 ||
                            weather.dt_txt.indexOf('12:00:00') !== -1 ||
                            weather.dt_txt.indexOf('18:00:00') !== -1
                    );
                    store.dispatch(successFiveDayMeteoDataLoad(fiveDayMeteo));
                } else {
                    store.dispatch(failureFiveDayMeteoDataLoad());
                }
            })
            .catch((error: Error) => {
                console.log(error.message);
                store.dispatch(failureFiveDayMeteoDataLoad());
            });
    };
}

// const om = new OpenMeteo();

export default OpenMeteo;
