import { getCurrentCountFetchedPosts, getLenOfPostsLoadPortion } from "../selectors/jsonpostsSelectors";
import { IAction, IAppStore, IComment, IPost, IUser } from "../types/interfaces";
import { EJsonPostsActions } from "../types/types";

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

export const setCountFetchedJsonPosts = (CountFetchedJsonPosts: number): IAction => ({
  type: EJsonPostsActions.SET_COUNT_FETCHED_JSON_POSTS,
  payload: CountFetchedJsonPosts
});

const loadJsonPost = (url: string) => {
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
                  dispatch({
                    type: EJsonPostsActions.SUCCESS_JSON_POST_DATA_LOAD,
                    payload: post
                  });
                } else {
                  dispatch({
                    type: EJsonPostsActions.FAILURE_JSON_POST_DATA_LOAD
                  });
                }
              })
              .catch((error: Error) => {
                console.log(error.message);
                dispatch({
                  type: EJsonPostsActions.FAILURE_JSON_POST_DATA_LOAD
                });
              });
          })
          .catch((error: Error) => {
            console.log(error.message);
            dispatch({
              type: EJsonPostsActions.FAILURE_JSON_POST_DATA_LOAD
            });
          });
      })
      .catch((error: Error) => {
        console.log(error.message);
        dispatch({
          type: EJsonPostsActions.FAILURE_JSON_POST_DATA_LOAD
        });
      });
  };
};

export const loadPortionJsonPosts = () => {
  return (dispatch: any, getState: () => IAppStore) => {
    let lenOfPostsLoadPortion = getLenOfPostsLoadPortion(getState());
    let currentCountFetchedPosts = getCurrentCountFetchedPosts(getState());
    let postsUrls = Array(lenOfPostsLoadPortion)
      .fill(null)
      .map((_, index: number) => postsUrl + "/" + (currentCountFetchedPosts + index + 1));

    dispatch({
      type: EJsonPostsActions.SET_COUNT_FETCHED_JSON_POSTS,
      payload: currentCountFetchedPosts + lenOfPostsLoadPortion
    });

    dispatch({
      type: EJsonPostsActions.START_JSON_POST_DATA_LOAD
    });

    for (const url of postsUrls) {
      dispatch(loadJsonPost(url));
    }
  };
};
