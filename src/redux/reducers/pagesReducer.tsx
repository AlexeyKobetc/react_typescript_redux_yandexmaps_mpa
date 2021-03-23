import { pagesInit } from '../initialStore';
import { IPagesState } from '../types/interfaces';
import { PagesActionsTypes, PagesActionType } from '../types/types';

export const pageReducer = (
    state: IPagesState = pagesInit,
    action: PagesActionType
) => {
    switch (action.type) {
        case PagesActionsTypes.SET_ACTIVE_PATH:
            return { ...state, activePath: { activePath: action.payload } };
        default:
            return state;
    }
};
