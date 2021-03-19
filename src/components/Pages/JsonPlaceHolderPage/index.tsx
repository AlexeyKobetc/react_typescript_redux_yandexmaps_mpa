import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { loadPortionJsonPosts } from "../../../redux/actions/jsonpostsActions";
import { getJsonPosts, isJsonPostsLoad } from "../../../redux/selectors/jsonpostsSelectors";
import { IAppStore, IPost } from "../../../redux/types/interfaces";
import Loading from "../../../sharedcomponents/Loading";
import { renderCard } from "./functions";

const JsonPlaceHolderPage = ({ getJsonPosts, isJsonPostsLoad, loadPortionJsonPosts }: Props) => {
  return (
    <React.Fragment>
      {!isJsonPostsLoad || !getJsonPosts.length ? (
        <Loading text={`Загружаются посты с {JSON} Placeholder ...`} />
      ) : (
        <React.Fragment>
          <div className="row justify-content-center align-items-center">
            <div className="col d-flex flex-column justify-content-center align-items-center m-4">
              <h1 className="text-secondary"> {`{JSON} Placeholder`} </h1>
            </div>
          </div>

          <div className="row justify-content-center align-items-start">{renderCard(getJsonPosts)}</div>

          <div className="row justify-content-center align-items-center">
            <div className="col-11 d-grid d-flex flex-column justify-content-center align-items-center m-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  loadPortionJsonPosts();
                }}
              >
                {`Загрузить следующие 10 постов c  {JSON}  Placeholder`}
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapState = (store: IAppStore) => ({
  getJsonPosts: getJsonPosts(store),
  isJsonPostsLoad: isJsonPostsLoad(store)
});

const mapDispatch = {
  loadPortionJsonPosts
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {};

export default connector(JsonPlaceHolderPage);
