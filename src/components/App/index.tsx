import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { loadPortionJsonPosts } from "../../redux/actions/jsonpostsActions";
import { loadCurrentMeteo, loadFiveDayMeteo } from "../../redux/actions/meteoActions";
import { setActivePath } from "../../redux/actions/pagesActions";
import { getPages } from "../../redux/selectors/pageSelectors";

import { IAction, IAppStore, IPages } from "../../redux/types/interfaces";

import NoPage from "../Pages/NoPage";

const App = ({
  getPages,
  setActivePath,
  loadCurrentMeteo,
  loadFiveDayMeteo,
  loadPortionJsonPosts
}: IProps) => {
  const [currentPath] = useState(useLocation().pathname);

  useEffect(() => {
    setActivePath(currentPath);
    loadCurrentMeteo();
    loadFiveDayMeteo();
    loadPortionJsonPosts();
  }, []);

  return (
    <React.Fragment>
      <Switch>
        {Object.keys(getPages).map((pageName: string, index: number) => {
          const { path, component, isExact } = getPages[pageName];
          return <Route path={path} component={component} exact={isExact} key={`${pageName}_${index}`} />;
        })}
        <Route component={NoPage} />
      </Switch>
    </React.Fragment>
  );
};

export default connect(
  (store: IAppStore) => ({
    getPages: getPages(store)
  }),
  {
    setActivePath,
    loadCurrentMeteo,
    loadFiveDayMeteo,
    loadPortionJsonPosts
  }
)(App);

interface IProps {
  getPages: IPages;
  setActivePath: (pathName: string) => IAction;
  loadCurrentMeteo: () => void;
  loadFiveDayMeteo: () => void;
  loadPortionJsonPosts: () => void;
}
