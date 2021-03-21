import ym, { checkAddress } from "../../components/Pages/YandexMapsPage/components/YandexMaps";
import {
  getCurrentAddress,
  getDefaultRegion,
  getDestinationAddress,
  ymInputs
} from "../selectors/yandexmapsSelectors";
import { ICoordinates, IAddress, EYmData, AppThunk, IAppStore } from "../types/interfaces";
import { YmActionType, YandexMapsActionsTypes } from "../types/types";

export const savePosition = (
  coordinates: ICoordinates,
  address: IAddress,
  namePosition: EYmData
): YmActionType => ({
  type: YandexMapsActionsTypes.SAVE_POSITION,
  payload: { namePosition, coordinates, address }
});

export const setSourceInputValue = (inputValue: string): YmActionType => ({
  type: YandexMapsActionsTypes.SET_SOURCE_INPUT_VALUE,
  payload: { inputName: "inputSourceAddress", inputValue }
});

export const setDestinationInputValue = (inputValue: string): YmActionType => ({
  type: YandexMapsActionsTypes.SET_DESTINATION_INPUT_VALUE,
  payload: { inputName: "inputDestinationAddress", inputValue }
});

export const setInputValue = (inputName: string, inputValue: string): YmActionType => ({
  type: YandexMapsActionsTypes.INPUT_VALUE_CHANGE,
  payload: { inputName, inputValue }
});

export const setInputValid = (inputName: string, isValid: boolean): YmActionType => ({
  type: YandexMapsActionsTypes.INPUT_VALID_CHANGE,
  payload: { inputName, isValid }
});

export const setButtonDisabled = (buttonName: string, isDisabled: boolean): YmActionType => ({
  type: YandexMapsActionsTypes.BUTTON_SET_DISABLED,
  payload: { buttonName, isDisabled }
});

export const ymButtonsClick = (buttonName: string): any => {
  return (dispatch: any, getState: () => IAppStore) => {
    if ((buttonName = "ok")) {
      dispatch(setButtonDisabled(buttonName, true));

      const inputs = ymInputs(getState());
      let isInputsValid = true;

      for (let inputName in inputs) {
        if (inputs[inputName].isValid !== true) {
          dispatch(setInputValid(inputName, false));
          isInputsValid = false;
        }
      }
      if (isInputsValid) {
        dispatch(setButtonDisabled(buttonName, false));
      }
    }
  };
};

export const ymInputValueBlur = (
  inputName: string,
  inputValue: string,
  isYandexMapsAddressInput: boolean
): any => {
  return (dispatch: any) => {
    if (isYandexMapsAddressInput) {
      dispatch(setInputValue(inputName, inputValue));
      dispatch(checkInputValueAddress(inputName, inputValue, true));
    }
  };
};

export const ymInputValueChange = (
  inputName: string,
  inputValue: string,
  validRegEx: RegExp[],
  maxLen: number,
  isYandexMapsAddressInput: boolean
): any => {
  const isValid =
    validRegEx?.reduce((isValid: boolean, reg: RegExp) => {
      return isValid || reg.test(inputValue.trim());
    }, false) || false;

  return (dispatch: any, getState: () => IAppStore) => {
    if (isYandexMapsAddressInput) {
      dispatch(setInputValue(inputName, inputValue));
      dispatch(checkInputValueAddress(inputName, inputValue));
    } else {
      dispatch(setInputValue(inputName, inputValue.trim().slice(0, maxLen)));
      dispatch(setInputValid(inputName, isValid));
    }

    const inputs = ymInputs(getState());

    let isInputsValid = true;

    for (let inputName in inputs) {
      if (inputs[inputName].isValid !== true) {
        isInputsValid = false;
      }
    }
    if (isInputsValid) {
      dispatch(setButtonDisabled("ok", false));
    }
  };
};

const checkInputValueAddress = (inputName: string, inputValue: string, isBlur: boolean = false): AppThunk => {
  return (dispatch, getState) => {
    let region =
      inputName === "inputSourceAddress"
        ? getCurrentAddress(getState()).region
        : getDestinationAddress(getState()).region;
    const namePosition =
      inputName === "inputSourceAddress" ? EYmData.USER_POSITION : EYmData.DESTINATION_POSITION;

    if (getDestinationAddress(getState()).region === getDefaultRegion(getState()))
      region = getCurrentAddress(getState()).region;

    checkAddress<any>(inputValue, region)
      .then(geoData => {
        const geoObject = geoData.geoObjects.get(0);
        const { description, name, text } = geoObject.properties.getAll();
        const coordinates = geoObject.geometry.getCoordinates();
        const precision = geoObject.properties.get("metaDataProperty.GeocoderMetaData.precision");
        if (precision === "other") {
          dispatch(setInputValid(inputName, false));
        } else {
          dispatch(setInputValid(inputName, true));
          if (isBlur) {
            dispatch(setInputValue(inputName, text));
            ym.drawPosition(
              namePosition,
              {
                latitude: coordinates[0],
                longitude: coordinates[1]
              },
              { region: description, fullAddress: text, shortAddress: name }
            );
          }
        }
      })
      .catch((error: Error) => console.log(error.message));
  };
};
