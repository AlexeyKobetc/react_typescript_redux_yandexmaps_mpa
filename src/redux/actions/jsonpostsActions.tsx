import { getCurrentCountFetchedPosts, getLenOfPostsLoadPortion } from "../selectors/jsonpostsSelectors";
import { AppThunk, IAppStore, IComment, IPost, IUser } from "../types/interfaces";
import { JsonPostsActionsTypes, JsonPostsActionType } from "../types/types";

const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const commentsUrl = "https://jsonplaceholder.typicode.com/comments";
const usersUrl = "https://jsonplaceholder.typicode.com/users";

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Response Not OK");
  }

  return await response.json();
}

const loadJsonPost = (url: string): AppThunk => {
  return (dispatch: any) => {
    let isPostsLoad = false;
    let isCommentsLoad = false;
    let isUsersLoad = false;

    getData<IPost>(url)
      .then(post => {
        const { id, userId } = post;
        if (id && userId) isPostsLoad = true;
        return getData<IComment[]>(commentsUrl + "?postId=" + id)
          .then(comments => {
            if (comments.length) isCommentsLoad = true;
            post = { ...post, comments };
            return getData<IUser>(usersUrl + "/" + userId)
              .then(user => {
                if (Object.keys(user).length) isUsersLoad = true;
                post = { ...post, user };
                if (isPostsLoad && isCommentsLoad && isUsersLoad) {
                  dispatch(successJsonPostsDataLoad(post));
                } else {
                  dispatch(failureJsonPostsDataLoad());
                }
              })
              .catch((error: Error) => {
                console.log(error.message);
                dispatch(failureJsonPostsDataLoad());
              });
          })
          .catch((error: Error) => {
            console.log(error.message);
            dispatch(failureJsonPostsDataLoad());
          });
      })
      .catch((error: Error) => {
        console.log(error.message);
        dispatch(failureJsonPostsDataLoad());
      });
  };
};

export const loadPortionJsonPosts = (): AppThunk => {
  return (dispatch: any, getState: () => IAppStore) => {
    let lenOfPostsLoadPortion = getLenOfPostsLoadPortion(getState());
    let currentCountFetchedPosts = getCurrentCountFetchedPosts(getState());
    let postsUrls = Array(lenOfPostsLoadPortion)
      .fill(null)
      .map((_, index: number) => postsUrl + "/" + (currentCountFetchedPosts + index + 1));

    dispatch(setCountFetchedPosts(currentCountFetchedPosts + lenOfPostsLoadPortion));

    dispatch(startJsonPostsDataLoad());

    for (const url of postsUrls) {
      dispatch(loadJsonPost(url));
    }
  };
};

const startJsonPostsDataLoad = (): JsonPostsActionType => ({
  type: JsonPostsActionsTypes.START_JSON_POSTS_DATA_LOAD
});

const successJsonPostsDataLoad = (post: IPost): JsonPostsActionType => ({
  type: JsonPostsActionsTypes.SUCCESS_JSON_POSTS_DATA_LOAD,
  payload: post
});

const failureJsonPostsDataLoad = (): JsonPostsActionType => ({
  type: JsonPostsActionsTypes.FAILURE_JSON_POSTS_DATA_LOAD
});

const setCountFetchedPosts = (countFetchedJsonPosts: number): JsonPostsActionType => ({
  type: JsonPostsActionsTypes.SET_COUNT_FETCHED_JSON_POSTS,
  payload: countFetchedJsonPosts
});
