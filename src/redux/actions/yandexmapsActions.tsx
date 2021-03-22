import { ICoordinates, IAddress, EYmData } from '../types/interfaces';
import { YmActionType, YandexMapsActionsTypes } from '../types/types';

export const savePosition = (
    coordinates: ICoordinates,
    address: IAddress,
    namePosition: EYmData
): YmActionType => ({
    type: YandexMapsActionsTypes.SAVE_POSITION,
    payload: { namePosition, coordinates, address },
});

export const setSourceInputValue = (inputValue: string): YmActionType => ({
    type: YandexMapsActionsTypes.SET_SOURCE_INPUT_VALUE,
    payload: { inputName: 'inputSourceAddress', inputValue },
});

export const setDestinationInputValue = (inputValue: string): YmActionType => ({
    type: YandexMapsActionsTypes.SET_DESTINATION_INPUT_VALUE,
    payload: { inputName: 'inputDestinationAddress', inputValue },
});

export const setInputValue = (
    inputName: string,
    inputValue: string
): YmActionType => ({
    type: YandexMapsActionsTypes.INPUT_VALUE_CHANGE,
    payload: { inputName, inputValue },
});

export const setInputValid = (
    inputName: string,
    isValid: boolean
): YmActionType => ({
    type: YandexMapsActionsTypes.INPUT_VALID_CHANGE,
    payload: { inputName, isValid },
});

export const setButtonDisabled = (
    buttonName: string,
    isDisabled: boolean
): YmActionType => ({
    type: YandexMapsActionsTypes.BUTTON_SET_DISABLED,
    payload: { buttonName, isDisabled },
});
