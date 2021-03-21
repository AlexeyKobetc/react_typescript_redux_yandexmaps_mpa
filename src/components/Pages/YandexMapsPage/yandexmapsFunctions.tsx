import {
  isSetUserPosition,
  getCurrentAddress,
  getCurrentCoordinates
} from "../../../redux/selectors/yandexmapsSelectors";
import { store } from "../../../redux/Store";
import { IPosition, ICoordinates } from "../../../redux/types/interfaces";

declare var ymaps: any;
export const ymScriptUrl =
  "https://api-maps.yandex.ru/2.1/?apikey=ba493d93-6641-43da-97fe-0d3f01ccf9b0&lang=ru_RU";

export async function adressToCoordsCodding<T>(address: string): Promise<T> {
  const responce = await ymaps.geocode(address);
  return await responce.geoObjects.get(0).geometry.getCoordinates();
}

export async function coordsToAddressCodding<T>(coordinates: ICoordinates): Promise<T> {
  const { latitude, longitude } = coordinates;
  const responce = await ymaps.geocode([latitude, longitude]);
  return await responce.geoObjects.get(0).properties.getAll();
}

export async function getGeolocation<T>(provider: string = "yandex"): Promise<T> {
  const location = ymaps.geolocation.get({ provider: provider, mapStateAutoApply: true });

  return await location;
}

export function getUserPositionFromGeolocation(): Promise<IPosition> {
  return new Promise(resolve => {
    if (!isSetUserPosition(store.getState())) {
      getGeolocation()
        .then((location: any) => {
          if (location.geoObjects.getLength()) {
            const coordinates: number[] = location.geoObjects.get(0).geometry.getCoordinates();
            const { description, name, text } = location.geoObjects.get(0).properties.getAll();
            resolve({
              address: { region: description, fullAddress: text, shortAddress: name },
              coordinates: { latitude: coordinates[0], longitude: coordinates[1] }
            });
          } else {
            resolve({
              address: getCurrentAddress(store.getState()),
              coordinates: getCurrentCoordinates(store.getState())
            });
          }
        })
        .catch((error: Error) => console.log(error.message));
    } else {
      resolve({
        address: getCurrentAddress(store.getState()),
        coordinates: getCurrentCoordinates(store.getState())
      });
    }
  });
}

export function ymScriptLoad(scriptUrl: string): Promise<boolean> {
  let isYmScriptLoad = false;
  const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll("script");
  scripts.forEach((script: HTMLScriptElement) => {
    if (script.src === ymScriptUrl) {
      isYmScriptLoad = true;
    }
  });
  if (!isYmScriptLoad) {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  } else {
    return new Promise(resolve => {
      resolve(true);
    });
  }
}

export function createMapMarker(
  markerType: string,
  markerId: string,
  markerContent: string = "",
  markerHoverContent: string = "",
  draggAble: boolean = true,
  coordinates: ICoordinates
): void {
  const { latitude, longitude } = coordinates;
  return new ymaps.GeoObject(
    {
      geometry: {
        type: "Point",
        coordinates: [latitude, longitude]
      },
      properties: {
        iconContent: markerContent,
        hintContent: markerHoverContent,
        id: markerId
      }
    },
    {
      preset: markerType,
      draggable: draggAble
    }
  );
}
