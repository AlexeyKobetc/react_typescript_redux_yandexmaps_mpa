import React from "react";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";

import { pageReducer } from "./reducers/pagesReducer";
import { meteoReducer } from "./reducers/meteoReducer";
import { jsonpostsReducer } from "./reducers/jsonpostsReducer";
import { yandexmapsReducer } from "./reducers/yandexmapsReducer";

export const rootReducer = combineReducers({
  pages: pageReducer,
  meteo: meteoReducer,
  jsonposts: jsonpostsReducer,
  yandexmaps: yandexmapsReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const AppStore: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>;

export default AppStore;
