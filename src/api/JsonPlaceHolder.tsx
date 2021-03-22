import {
    failureJsonPostsDataLoad,
    setCountFetchedPosts,
    startJsonPostsDataLoad,
    successJsonPostsDataLoad,
} from '../redux/actions/jsonpostsActions';
import {
    getCurrentCountFetchedPosts,
    getLenOfPostsLoadPortion,
    isJsonPostsLoad,
} from '../redux/selectors/jsonpostsSelectors';
import { store } from '../redux/Store';
import { IComment, IPost, IUser } from '../redux/types/interfaces';

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

async function getData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Response Not OK');
    }

    return await response.json();
}

class JsonPlaceHolder {
    constructor() {
        this.loadPortionJsonPosts();
    }

    public loadJsonPostsData = () => {};

    private loadPortionJsonPosts = () => {
        let lenOfPostsLoadPortion = getLenOfPostsLoadPortion(store.getState());
        let currentCountFetchedPosts = getCurrentCountFetchedPosts(
            store.getState()
        );
        let postsUrls = Array(lenOfPostsLoadPortion)
            .fill(null)
            .map(
                (_, index: number) =>
                    postsUrl + '/' + (currentCountFetchedPosts + index + 1)
            );

        store.dispatch(
            setCountFetchedPosts(
                currentCountFetchedPosts + lenOfPostsLoadPortion
            )
        );

        store.dispatch(startJsonPostsDataLoad());

        for (const url of postsUrls) {
            this.loadJsonPost(url);
        }
    };

    private loadJsonPost = (url: string) => {
        let isPostsLoad = false;
        let isCommentsLoad = false;
        let isUsersLoad = false;

        getData<IPost>(url)
            .then(post => {
                const { id, userId } = post;
                if (id && userId) isPostsLoad = true;
                return getData<IComment[]>(commentsUrl + '?postId=' + id)
                    .then(comments => {
                        if (comments.length) isCommentsLoad = true;
                        post = { ...post, comments };
                        return getData<IUser>(usersUrl + '/' + userId)
                            .then(user => {
                                if (Object.keys(user).length)
                                    isUsersLoad = true;
                                post = { ...post, user };
                                if (
                                    isPostsLoad &&
                                    isCommentsLoad &&
                                    isUsersLoad
                                ) {
                                    store.dispatch(
                                        successJsonPostsDataLoad(post)
                                    );
                                } else {
                                    store.dispatch(failureJsonPostsDataLoad());
                                }
                            })
                            .catch((error: Error) => {
                                console.log(error.message);
                                store.dispatch(failureJsonPostsDataLoad());
                            });
                    })
                    .catch((error: Error) => {
                        console.log(error.message);
                        store.dispatch(failureJsonPostsDataLoad());
                    });
            })
            .catch((error: Error) => {
                console.log(error.message);
                store.dispatch(failureJsonPostsDataLoad());
            });
    };
}

export default JsonPlaceHolder;
