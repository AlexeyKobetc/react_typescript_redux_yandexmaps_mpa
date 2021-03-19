import { jsonpostsInit } from "../initialStore";
import { IJsonPostsStore } from "../types/interfaces";
import { EJsonPostsActions, TJsonPostsAction } from "../types/types";

export const jsonpostsReducer = (state: IJsonPostsStore = jsonpostsInit, action: TJsonPostsAction) => {
  switch (action.type) {
    case EJsonPostsActions.SET_COUNT_FETCHED_JSON_POSTS:
      return {
        ...state,
        postsCounts: {
          ...state.postsCounts,
          currentCountFetchedPosts: action.payload
        }
      };

    case EJsonPostsActions.SUCCESS_JSON_POSTS_DATA_LOAD:
      return { ...state, jsonposts: [...state.jsonposts, action.payload], isPostsLoad: true };

    case EJsonPostsActions.FAILURE_JSON_POSTS_DATA_LOAD:
      return {
        ...state,
        isPostsLoad: state.isPostsLoad === true ? true : false
      };

    default:
      return state;
  }
};
