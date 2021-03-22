import { IAppStore, IPost, IYMStore } from '../types/interfaces';

export const getJsonPosts = (store: IAppStore): IPost[] =>
    store.jsonposts.jsonposts;
export const isJsonPostsLoad = (store: IAppStore): boolean | null =>
    store.jsonposts.isPostsLoad;
export const getLenOfPostsLoadPortion = (store: IAppStore): number =>
    store.jsonposts.postsCounts.lenOfPostsLoadPortion;
export const getCurrentCountFetchedPosts = (store: IAppStore): number =>
    store.jsonposts.postsCounts.currentCountFetchedPosts;
