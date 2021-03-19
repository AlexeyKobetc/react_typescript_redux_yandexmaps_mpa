import { getCurrentCoordinates, getYm, getYmCurrentZoom } from "../selectors/yandexmapsSelectors";
import { AppThunk, EYmData, IAddress, IAppStore, ICoordinates } from "../types/interfaces";
import { EYandexMapsActions, TYmAction } from "../types/types";

declare var ymaps: any;

const ymScriptUrl = "https://api-maps.yandex.ru/2.1/?apikey=ba493d93-6641-43da-97fe-0d3f01ccf9b0&lang=ru_RU";

export const initMapEnvironment = (
  ymDivContainer: HTMLDivElement | null,
  isYmScriptLoad: boolean | null
): AppThunk => {
  if (ymDivContainer && isYmScriptLoad) {
    return (dispatch: any, getStore: () => IAppStore) => {
      dispatch(startYmApiInit());
      ymaps.ready(
        () => {
          dispatch(successYmApiInit());
          dispatch(initMap(ymDivContainer, getYmCurrentZoom(getStore()), getCurrentCoordinates(getStore())));
        },
        () => dispatch(failureYmApiInit())
      );
    };
  } else {
    return (dispatch: any) => {
      isYmScriptLoad === null && dispatch(loadYmScript());
    };
  }
};

export const destroyMap = () => {
  return (dispatch: any, getStore: () => IAppStore) => {
    if (getYm(getStore()) !== null) {
      dispatch(ymReady(false));
      getYm(getStore()).destroy();
      dispatch(ymDelete());
    }
  };
};

const initMap = (ymDivContainer: HTMLDivElement, currentZoom: number, mapCenterCoordinates: ICoordinates) => {
  const { latitude, longitude } = mapCenterCoordinates;
  const createMap = () => {
    return new ymaps.Map(ymDivContainer, {
      center: [latitude, longitude],
      zoom: currentZoom,
      controls: ["smallMapDefaultSet"],
      autoFitToViewport: "always"
    });
  };

  return (dispatch: any, getStore: () => IAppStore) => {
    if (getYm(getStore()) === null) {
      dispatch(ymCreate(createMap()));
      dispatch(ymReady(true));
    }
  };
};

const loadYmScript = () => {
  let isYmScriptLoad = false;
  const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll("script");
  scripts.forEach((script: HTMLScriptElement) => {
    if (script.src === ymScriptUrl) {
      isYmScriptLoad = true;
    }
  });

  if (!isYmScriptLoad) {
    return (dispatch: any) => {
      dispatch(startYmScriptLoad());
      loadScript(ymScriptUrl)
        .then(
          () => dispatch(successYmScriptLoad()),
          () => dispatch(failureYmScriptLoad())
        )
        .catch((error: Error) => dispatch(failureYmScriptLoad()));
    };
  } else {
    return (dispatch: any) => {
      dispatch(alreadyYmScriptLoad());
    };
  }
};

const loadScript = (scriptUrl: string) => {
  return new Promise(function(resolve, reject) {
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const savePosition = (coordinates: ICoordinates, address: IAddress, namePosition: EYmData): TYmAction => ({
  type: EYandexMapsActions.SAVE_POSITION,
  payload: { namePosition, coordinates, address }
});

const startYmScriptLoad = (): TYmAction => ({
  type: EYandexMapsActions.START_YM_SCRIPT_LOAD
});

const successYmScriptLoad = (): TYmAction => ({
  type: EYandexMapsActions.SUCCESS_YM_SCRIPT_LOAD
});

const failureYmScriptLoad = (): TYmAction => ({
  type: EYandexMapsActions.FAILURE_YM_SCRIPT_LOAD
});

const alreadyYmScriptLoad = (): TYmAction => ({
  type: EYandexMapsActions.ALREADY_YM_SCRIPT_LOADED
});

const startYmApiInit = (): TYmAction => ({
  type: EYandexMapsActions.START_YM_API_INIT
});

const successYmApiInit = (): TYmAction => ({
  type: EYandexMapsActions.SUCCESS_YM_API_INIT
});

const failureYmApiInit = (): TYmAction => ({
  type: EYandexMapsActions.FAILURE_YM_SCRIPT_LOAD
});

const ymCreate = (map: any): TYmAction => ({
  type: EYandexMapsActions.YM_CREATE,
  payload: map
});

const ymDelete = (): TYmAction => ({
  type: EYandexMapsActions.YM_DELETE
});

const ymReady = (isReady: boolean): TYmAction => ({
  type: EYandexMapsActions.YM_READY,
  payload: isReady
});
