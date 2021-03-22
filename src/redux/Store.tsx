import React from 'react';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { pageReducer } from './reducers/pagesReducer';
import { meteoReducer } from './reducers/meteoReducer';
import { jsonpostsReducer } from './reducers/jsonpostsReducer';
import { yandexmapsReducer } from './reducers/yandexmapsReducer';

import OpenMeteo from '../api/OpenMeteo';
import JsonPlaceHolder from '../api/JsonPlaceHolder';
import YandexMaps from '../api/YandexMaps';

export const rootReducer = combineReducers({
    pages: pageReducer,
    meteo: meteoReducer,
    jsonposts: jsonpostsReducer,
    yandexmaps: yandexmapsReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const AppStore: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
);

export const ym = new YandexMaps();
export const om = new OpenMeteo();
export const jp = new JsonPlaceHolder();

export default AppStore;
