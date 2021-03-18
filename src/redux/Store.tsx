import React from "react";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { pageReducer } from "./reducers/pagesReducer";
import { jsonpostsReducer } from "./reducers/jsonpostsReducer";
import { meteoReducer } from "./reducers/meteoReducer";

export const rootReducer = combineReducers({
  pages: pageReducer,
  meteo: meteoReducer,
  jsonposts: jsonpostsReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const AppStore: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>;

export default AppStore;
