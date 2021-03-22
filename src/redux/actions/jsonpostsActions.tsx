import { IPost } from '../types/interfaces';
import { JsonPostsActionsTypes, JsonPostsActionType } from '../types/types';

export const startJsonPostsDataLoad = (): JsonPostsActionType => ({
    type: JsonPostsActionsTypes.START_JSON_POSTS_DATA_LOAD,
});

export const successJsonPostsDataLoad = (post: IPost): JsonPostsActionType => ({
    type: JsonPostsActionsTypes.SUCCESS_JSON_POSTS_DATA_LOAD,
    payload: post,
});

export const failureJsonPostsDataLoad = (): JsonPostsActionType => ({
    type: JsonPostsActionsTypes.FAILURE_JSON_POSTS_DATA_LOAD,
});

export const setCountFetchedPosts = (
    countFetchedJsonPosts: number
): JsonPostsActionType => ({
    type: JsonPostsActionsTypes.SET_COUNT_FETCHED_JSON_POSTS,
    payload: countFetchedJsonPosts,
});
