import { jsonpostsInit } from '../initialStore';
import { IJsonPostsState } from '../types/interfaces';
import { JsonPostsActionsTypes, JsonPostsActionType } from '../types/types';

export const jsonpostsReducer = (
    state: IJsonPostsState = jsonpostsInit,
    action: JsonPostsActionType
) => {
    switch (action.type) {
        case JsonPostsActionsTypes.SET_COUNT_FETCHED_JSON_POSTS:
            return {
                ...state,
                postsCounts: {
                    ...state.postsCounts,
                    currentCountFetchedPosts: action.payload,
                },
            };

        case JsonPostsActionsTypes.SUCCESS_JSON_POSTS_DATA_LOAD:
            return {
                ...state,
                jsonposts: [...state.jsonposts, action.payload],
                isPostsLoad: true,
            };

        case JsonPostsActionsTypes.FAILURE_JSON_POSTS_DATA_LOAD:
            return {
                ...state,
                isPostsLoad: state.isPostsLoad === true ? true : false,
            };

        default:
            return state;
    }
};
