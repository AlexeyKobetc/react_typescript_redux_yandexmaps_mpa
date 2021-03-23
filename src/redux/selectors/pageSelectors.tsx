import { IAppState, IPages } from '../types/interfaces';

export const getPages = (state: IAppState): IPages => state.pages.pages;
export const getActivePath = (state: IAppState): string =>
    state.pages.activePath.activePath;
