import AboutPage from '../components/Pages/AboutPage';
import JsonPlaceHolderPage from '../components/Pages/JsonPlaceHolderPage';
import MainPage from '../components/Pages/MainPage';
import MeteoPage from '../components/Pages/MeteoPage';
import YandexMapsPage from '../components/Pages/YandexMapsPage';
import {
    IActivePath,
    IButtons,
    IGeoMarker,
    IInputs,
    IJsonPostsStore,
    IMeteoStore,
    IPages,
    IYMData,
    IYMStore,
} from './types/interfaces';

const pages: IPages = {
    Главная: {
        path: '/',
        component: MainPage,
        isExact: true,
        isActive: true,
    },
    'Yandex Maps': {
        path: '/ymaps',
        component: YandexMapsPage,
        isExact: false,
        isActive: false,
    },
    '{JSON} Placeholder': {
        path: '/json',
        component: JsonPlaceHolderPage,
        isExact: false,
        isActive: false,
    },

    'Open Weather': {
        path: '/meteo',
        component: MeteoPage,
        isExact: false,
        isActive: false,
    },
    // ,
    // Описание: {
    //   path: "/about",
    //   component: AboutPage,
    //   isExact: false,
    //   isActive: false
    // }
};

const activePath: IActivePath = { activePath: '/' };

export const pagesInit = {
    pages,
    activePath,
};

export const meteoInit: IMeteoStore = {
    countMeteoCellsOnScreen: 1,
    currentMeteoData: { temp: 0, deg: 0, speed: 0, description: '', icon: '' },
    fiveDayMeteoData: [],
    isFiveDayMeteoLoad: null,
    isCurrentMeteoLoad: null,
};

export const jsonpostsInit: IJsonPostsStore = {
    jsonposts: [],
    postsCounts: {
        lenOfPostsLoadPortion: 10,
        currentCountFetchedPosts: 0,
    },
    isPostsLoad: null,
};

const ymData: IYMData = {
    defaultPosition: {
        coordinates: { latitude: 56.85, longitude: 60.65 },
        address: {
            region: 'Россия, Свердловская область, Екатеринбург',
            fullAddress:
                'Россия, Свердловская область, Екатеринбург, Кировский район, микрорайон Втузгородок, Академическая улица, 16',
            shortAddress: 'Академическая улица, 16',
        },
    },
    userPosition: {
        coordinates: { longitude: 0, latitude: 0 },
        address: {
            region: '',
            fullAddress: '',
            shortAddress: '',
        },
    },
    destinationPosition: {
        coordinates: { longitude: 0, latitude: 0 },
        address: {
            region: '',
            fullAddress: '',
            shortAddress: '',
        },
    },
};

const ymInputs: IInputs = {
    inputSourceAddress: {
        textarea: false,
        labelText: 'Откуда Вас забрать.',
        placeHolder: 'Откуда Вас забрать.',
        helpText: 'Введите адрес откуда Вас забрать.',
        errorLabel: 'Уточните адрес',
        value: '',
        isValid: null,
        isDisable: false,
        maxLen: 150,
        regEx: [/^[\u0400-\u04FFa-zA-Z0-9.,\- ]+$/],
        isYandex: true,
    },
    inputDestinationAddress: {
        textarea: false,
        labelText: 'Куда Вы поедете.',
        placeHolder: 'Куда Вы поедете.',
        helpText: 'Введите адрес куда Вы поедете.',
        errorLabel: 'Уточните адрес',
        value: '',
        isValid: null,
        isDisable: false,
        maxLen: 150,
        regEx: [/^[\u0400-\u04FFa-zA-Z0-9.,\- ]+$/],
        isYandex: true,
    },
    inputName: {
        textarea: false,
        labelText: 'Ваше имя.',
        placeHolder: 'Ваше имя.',
        helpText: 'Как к Вам обращаться.',
        errorLabel: 'Уточните имя',
        value: '',
        isValid: null,
        isDisable: false,
        maxLen: 50,
        regEx: [/^[\u0400-\u04FF ]+$/],
        isYandex: false,
    },
    inputPhone: {
        textarea: false,
        labelText: 'Ваш E-Mail или номер телефона',
        placeHolder: 'Ваш E-Mail или номер телефона',
        helpText: 'Введите вашу электронную почту или номер телефона.',
        errorLabel: 'name@server.com или +7XXXXXXXXXX',
        value: '',
        isValid: null,
        isDisable: false,
        maxLen: 50,
        regEx: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            /^((\+7|7|8)+([0-9]){10})$/,
        ],
        isYandex: false,
    },
    // ,
    // inputComment: {
    //   textarea: true,
    //   labelText: "Комментарий для водителя",
    //   placeHolder: "Комментарий для водителя",
    //   helpText: "Если есть особые пожелания, напишите их здесь.",
    //   errorLabel:
    //     "  Комментарий может содержать только русские или латинские символы, цифры и знаки пунктуации.",
    //   value: "",
    //   isValid: null,
    //   isDisable: false,
    //   maxLen: 250,
    //   regEx: [/^[\u0400-\u04FFa-zA-Z0-9.,?!\-\n\r ]+$/],
    //   isYandex: false
    // }
};

export const ymButtons: IButtons = {
    ok: {
        labelText: 'Заказать',
        disabled: false,
    },
    // ,
    // help: {
    //   labelText: "Инструкция",
    //   disabled: false
    // }
};

export const ymInit: IYMStore = {
    ymData,
    ymInputs,
    ymButtons,
};
