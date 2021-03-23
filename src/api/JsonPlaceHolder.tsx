import {
    failureJsonPostsDataLoad,
    setCountFetchedPosts,
    startJsonPostsDataLoad,
    successJsonPostsDataLoad,
} from '../redux/actions/jsonpostsActions';
import {
    getCurrentCountFetchedPosts,
    getLenOfPostsLoadPortion,
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

    public loadPortionJsonPosts = () => {
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

    private loadJsonPost = async (url: string) => {
        let isPostsLoad = false;
        let isCommentsLoad = false;
        let isUsersLoad = false;
        let postElement = {};
        try {
            const post = await getData<IPost>(url);
            const { id, userId } = post;
            if (id && userId) {
                isPostsLoad = true;
                postElement = post;
            } else {
                throw new Error('id Or userId Not OK');
            }
            try {
                const comments = await getData<IComment[]>(
                    commentsUrl + '?postId=' + id
                );
                if (comments.length) {
                    isCommentsLoad = true;
                    postElement = { ...postElement, comments };
                } else {
                    throw new Error('comments Not OK');
                }
                try {
                    const user = await getData<IUser>(usersUrl + '/' + userId);
                    if (Object.keys(user).length) {
                        isUsersLoad = true;
                        postElement = { ...postElement, user };
                    } else {
                        throw new Error('user Data Not OK');
                    }
                    if (isPostsLoad && isCommentsLoad && isUsersLoad) {
                        store.dispatch(
                            successJsonPostsDataLoad(postElement as IPost)
                        );
                    } else {
                        store.dispatch(failureJsonPostsDataLoad());
                    }
                } catch (error) {
                    console.log(error.message);
                    store.dispatch(failureJsonPostsDataLoad());
                }
            } catch (error) {
                console.log(error.message);
                store.dispatch(failureJsonPostsDataLoad());
            }
        } catch (error) {
            console.log(error.message);
            store.dispatch(failureJsonPostsDataLoad());
        }
    };
}

export default JsonPlaceHolder;
