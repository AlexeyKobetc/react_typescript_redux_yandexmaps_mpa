import { ymInit } from '../initialStore';
import { IYMState } from '../types/interfaces';
import { YandexMapsActionsTypes, YmActionType } from '../types/types';

export const yandexmapsReducer = (state: IYMState = ymInit, action: YmActionType) => {
    switch (action.type) {
        case YandexMapsActionsTypes.SAVE_POSITION:
            const { namePosition, coordinates, address } = action.payload;
            return {
                ...state,
                ymData: {
                    ...state.ymData,
                    [namePosition]: { coordinates, address },
                },
            };

        case YandexMapsActionsTypes.SET_SOURCE_INPUT_VALUE:
            return {
                ...state,
                ymInputs: {
                    ...state.ymInputs,
                    [action.payload.inputName]: {
                        ...state.ymInputs[action.payload.inputName],
                        value: action.payload.inputValue,
                        isValid: true,
                    },
                },
            };

        case YandexMapsActionsTypes.SET_DESTINATION_INPUT_VALUE:
            return {
                ...state,
                ymInputs: {
                    ...state.ymInputs,
                    [action.payload.inputName]: {
                        ...state.ymInputs[action.payload.inputName],
                        value: action.payload.inputValue,
                        isValid: true,
                    },
                },
            };

        case YandexMapsActionsTypes.INPUT_VALUE_CHANGE:
            return {
                ...state,
                ymInputs: {
                    ...state.ymInputs,
                    [action.payload.inputName]: {
                        ...state.ymInputs[action.payload.inputName],
                        value: action.payload.inputValue,
                    },
                },
            };

        case YandexMapsActionsTypes.INPUT_VALID_CHANGE:
            return {
                ...state,
                ymInputs: {
                    ...state.ymInputs,
                    [action.payload.inputName]: {
                        ...state.ymInputs[action.payload.inputName],
                        isValid: action.payload.isValid,
                    },
                },
            };

        case YandexMapsActionsTypes.BUTTON_SET_DISABLED:
            return {
                ...state,
                ymButtons: {
                    ...state.ymButtons,
                    [action.payload.buttonName]: {
                        ...state.ymButtons[action.payload.buttonName],
                        disabled: action.payload.isDisabled,
                    },
                },
            };

        case YandexMapsActionsTypes.SET_REGION_IN_INPUT_LABEL:
            return {
                ...state,
                ymInputs: {
                    ...state.ymInputs,
                    [action.payload.inputName]: {
                        ...state.ymInputs[action.payload.inputName],
                        labelText:
                            state.ymInputs[action.payload.inputName].placeHolder +
                            ' ' +
                            action.payload.regionName +
                            '.',
                    },
                },
            };

        default:
            return state;
    }
};
