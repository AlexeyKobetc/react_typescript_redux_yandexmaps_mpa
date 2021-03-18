import { IAppStore, IPages, IPagesStore } from "../types/interfaces";

export const getPages = (store: IAppStore): IPages => store.pages.pages;
export const getActivePath = (store: IAppStore): string => store.pages.activePath.activePath;
