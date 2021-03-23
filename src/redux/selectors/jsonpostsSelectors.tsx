import { IAppState, IPost } from '../types/interfaces';

export const getJsonPosts = (state: IAppState): IPost[] =>
    state.jsonposts.jsonposts;
export const isJsonPostsLoad = (state: IAppState): boolean | null =>
    state.jsonposts.isPostsLoad;
export const getLenOfPostsLoadPortion = (state: IAppState): number =>
    state.jsonposts.postsCounts.lenOfPostsLoadPortion;
export const getCurrentCountFetchedPosts = (state: IAppState): number =>
    state.jsonposts.postsCounts.currentCountFetchedPosts;
