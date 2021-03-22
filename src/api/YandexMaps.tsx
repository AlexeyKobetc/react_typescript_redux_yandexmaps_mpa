import {
    EYmData,
    IAddress,
    ICoordinates,
    IGeoMarker,
    IPosition,
} from '../redux/types/interfaces';
import { store } from '../redux/Store';
import {
    savePosition,
    setButtonDisabled,
    setDestinationInputValue,
    setInputValid,
    setInputValue,
    setSourceInputValue,
} from '../redux/actions/yandexmapsActions';
import {
    getCurrentAddress,
    getCurrentCoordinates,
    getDefaultRegion,
    getDestinationAddress,
    getDestinationCoordinates,
    isSetUserPosition,
    ymInputs,
} from '../redux/selectors/yandexmapsSelectors';

declare var ymaps: any;

const ymScriptUrl =
    'https://api-maps.yandex.ru/2.1/?apikey=ba493d93-6641-43da-97fe-0d3f01ccf9b0&lang=ru_RU';

async function adressToCoordsCodding<T>(address: string): Promise<T> {
    const responce = await ymaps.geocode(address);
    return await responce.geoObjects.get(0).geometry.getCoordinates();
}

async function coordsToAddressCodding<T>(
    coordinates: ICoordinates
): Promise<T> {
    const { latitude, longitude } = coordinates;
    const responce = await ymaps.geocode([latitude, longitude]);
    return await responce.geoObjects.get(0).properties.getAll();
}

async function getGeolocation<T>(provider: string = 'yandex'): Promise<T> {
    const location = ymaps.geolocation.get({
        provider: provider,
        mapStateAutoApply: true,
    });

    return await location;
}

export async function checkAddress<T>(
    address: string,
    region: string
): Promise<T> {
    return (await ymaps.geocode(region + ' ' + address)) as Promise<T>;
}

class YandexMaps {
    private _ym: any = null;

    private _ymUserGeoMarker: IGeoMarker = {
        ymGeoMarker: null,
        icon: 'islands#darkGreenStretchyIcon',
        id: 'userGeoMarker',
        labelTextHeader: 'Вы здесь: ',
    };
    private _ymDestinationGeoMarker: IGeoMarker = {
        ymGeoMarker: null,
        icon: 'islands#yellowStretchyIcon',
        id: 'destinationGeoMarker',
        labelTextHeader: 'Вам нужно сюда: ',
    };

    private _currentMapZoom: number = 15;

    private _isYmApiReady: boolean = false;
    private _isYmScriptLoad: boolean = false;

    private _initTimer: NodeJS.Timeout | null = null;

    protected set ym(ym: any) {
        this._ym = ym;
    }

    protected get ym() {
        return this._ym;
    }

    protected set currentMapZoom(currentMapZoom: number) {
        this._currentMapZoom = currentMapZoom;
    }

    protected get currentMapZoom() {
        return this._currentMapZoom;
    }

    protected set isYmApiReady(isReady: boolean) {
        this._isYmApiReady = isReady;
    }

    protected get isYmApiReady() {
        return this._isYmApiReady;
    }

    protected set isYmScriptLoad(isLoad: boolean) {
        this._isYmScriptLoad = isLoad;
    }

    protected get isYmScriptLoad() {
        return this._isYmScriptLoad;
    }

    constructor() {}

    public initMapEnvironment = (ymDivContainer: HTMLDivElement | null) => {
        this.ymScriptLoad(ymScriptUrl).then((isLoad: boolean) => {
            this.isYmScriptLoad = isLoad;
            return ymaps
                .ready()
                .then(() => (this.isYmApiReady = true))
                .catch(() => (this.isYmApiReady = false));
        });

        this._initTimer = setInterval(() => {
            if (this.isYmApiReady && this.isYmScriptLoad && ymDivContainer) {
                clearInterval(this._initTimer as NodeJS.Timeout);
                this._initTimer = null;
                this.initMap(this.currentMapZoom, ymDivContainer);
            } else {
            }
        }, 500);
    };

    protected initMap = (
        currentMapZoom: number,
        ymDivContainer: HTMLDivElement
    ) => {
        const createMap = (coordinates: ICoordinates) => {
            return new ymaps.Map(ymDivContainer, {
                center: [coordinates.latitude, coordinates.longitude],
                zoom: currentMapZoom,
                controls: ['smallMapDefaultSet'],
                autoFitToViewport: 'always',
            });
        };

        if (this.ym) {
            this.ym.destroy();
            this.ym = null;
        }
        this.getUserPositionFromGeolocation().then((position: IPosition) => {
            store.dispatch(
                savePosition(
                    position.coordinates,
                    position.address,
                    EYmData.USER_POSITION
                )
            );

            this.ym = createMap(position.coordinates);
            if (this._ymUserGeoMarker.ymGeoMarker) {
                this.ym.geoObjects.add(this._ymUserGeoMarker.ymGeoMarker);
            } else {
                this.drawPosition(EYmData.USER_POSITION);
            }
            if (this._ymDestinationGeoMarker.ymGeoMarker) {
                this.ym.geoObjects.add(
                    this._ymDestinationGeoMarker.ymGeoMarker
                );
            }
            this.ym.events.add('contextmenu', this.mapHandler);
            this.ym.events.add('click', this.mapHandler);
            this.ym.events.add('boundschange', this.mapHandler);
        });
    };

    protected mapHandler = (mapEvent: any): void => {
        const type = mapEvent.get('type');

        if (type === 'contextmenu') {
            const mapClickCoordinates: number[] = mapEvent.get('coords');
            this.drawPosition(EYmData.DESTINATION_POSITION, {
                latitude: mapClickCoordinates[0],
                longitude: mapClickCoordinates[1],
            });
        }
        if (type === 'click') {
            const mapClickCoordinates: number[] = mapEvent.get('coords');
            this.drawPosition(EYmData.USER_POSITION, {
                latitude: mapClickCoordinates[0],
                longitude: mapClickCoordinates[1],
            });
        }
        if (type === 'boundschange') {
            this.currentMapZoom = mapEvent.get('newZoom');
        }
    };

    public drawPosition = (
        namePosition: EYmData,
        coordinates?: ICoordinates,
        address?: IAddress
    ): void => {
        if (coordinates && address) {
            store.dispatch(savePosition(coordinates, address, namePosition));
            this.drawMapMarker(namePosition, coordinates, address);
        } else if (!coordinates && !address) {
            this.drawMapMarker(namePosition);
        } else if (coordinates && !address) {
            coordsToAddressCodding<{
                description: string;
                name: string;
                text: string;
            }>(coordinates)
                .then(address => {
                    const { description, name, text } = address;
                    store.dispatch(
                        savePosition(
                            coordinates,
                            {
                                region: description,
                                fullAddress: text,
                                shortAddress: name,
                            },
                            namePosition
                        )
                    );
                    this.drawMapMarker(namePosition, coordinates, {
                        region: description,
                        fullAddress: text,
                        shortAddress: name,
                    });
                })
                .catch((error: Error) => console.log(error.message));
        } else if (!coordinates && address) {
            adressToCoordsCodding<number[]>(address.fullAddress)
                .then(coordinates => {
                    store.dispatch(
                        savePosition(
                            {
                                latitude: coordinates[0],
                                longitude: coordinates[1],
                            },
                            address,
                            namePosition
                        )
                    );
                    this.drawMapMarker(
                        namePosition,
                        {
                            latitude: coordinates[0],
                            longitude: coordinates[1],
                        },
                        address
                    );
                })
                .catch((error: Error) => console.log(error.message));
        }
    };

    protected drawMapMarker = (
        namePosition: EYmData,
        coordinates?: ICoordinates,
        address?: IAddress
    ) => {
        let mapMarker: IGeoMarker =
            namePosition === EYmData.USER_POSITION
                ? this._ymUserGeoMarker
                : this._ymDestinationGeoMarker;
        let markerAddress: IAddress = address
            ? address
            : namePosition === EYmData.USER_POSITION
            ? getCurrentAddress(store.getState())
            : getDestinationAddress(store.getState());
        let markerCoordinates: ICoordinates = coordinates
            ? coordinates
            : namePosition === EYmData.USER_POSITION
            ? getCurrentCoordinates(store.getState())
            : getDestinationCoordinates(store.getState());
        const { latitude, longitude } = markerCoordinates;

        if (namePosition === EYmData.USER_POSITION) {
            store.dispatch(setSourceInputValue(markerAddress.fullAddress));
        }

        if (namePosition === EYmData.DESTINATION_POSITION) {
            store.dispatch(setDestinationInputValue(markerAddress.fullAddress));
        }

        if (!mapMarker.ymGeoMarker) {
            mapMarker.ymGeoMarker = this.createMapMarker(
                mapMarker.icon,
                mapMarker.id,
                mapMarker.labelTextHeader + markerAddress.shortAddress,
                markerAddress.fullAddress,
                true,
                markerCoordinates
            );

            this.ym.geoObjects.add(mapMarker.ymGeoMarker);
            //this.ym.setCenter([latitude, longitude]);

            mapMarker.ymGeoMarker.events.add('dragend', (ymEvent: any) => {
                const target: any = ymEvent.get('target');
                const coordinates: number[] = target.geometry.getCoordinates();

                this.drawPosition(namePosition, {
                    latitude: coordinates[0],
                    longitude: coordinates[1],
                });
            });
            mapMarker.ymGeoMarker.events.add('click', () => {});
        } else {
            this.ym.geoObjects.each((placeMark: any) => {
                if (placeMark.properties.get('id') === mapMarker.id) {
                    placeMark.geometry.setCoordinates([latitude, longitude]);
                }
            });
            mapMarker.ymGeoMarker.properties.set(
                'iconContent',
                mapMarker.labelTextHeader + markerAddress.shortAddress
            );
            mapMarker.ymGeoMarker.properties.set(
                'hintContent',
                markerAddress.fullAddress
            );
            //this.ym.setCenter([latitude, longitude]);
        }
    };

    protected getUserPositionFromGeolocation = (): Promise<IPosition> => {
        return new Promise(resolve => {
            if (!isSetUserPosition(store.getState())) {
                getGeolocation()
                    .then((location: any) => {
                        if (location.geoObjects.getLength()) {
                            const coordinates: number[] = location.geoObjects
                                .get(0)
                                .geometry.getCoordinates();
                            const {
                                description,
                                name,
                                text,
                            } = location.geoObjects.get(0).properties.getAll();
                            resolve({
                                address: {
                                    region: description,
                                    fullAddress: text,
                                    shortAddress: name,
                                },
                                coordinates: {
                                    latitude: coordinates[0],
                                    longitude: coordinates[1],
                                },
                            });
                        } else {
                            resolve({
                                address: getCurrentAddress(store.getState()),
                                coordinates: getCurrentCoordinates(
                                    store.getState()
                                ),
                            });
                        }
                    })
                    .catch((error: Error) => console.log(error.message));
            } else {
                resolve({
                    address: getCurrentAddress(store.getState()),
                    coordinates: getCurrentCoordinates(store.getState()),
                });
            }
        });
    };

    protected ymScriptLoad = (scriptUrl: string): Promise<boolean> => {
        let isYmScriptLoad = false;
        const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll(
            'script'
        );
        scripts.forEach((script: HTMLScriptElement) => {
            if (script.src === ymScriptUrl) {
                isYmScriptLoad = true;
            }
        });
        if (!isYmScriptLoad) {
            return new Promise(resolve => {
                const script = document.createElement('script');
                script.src = scriptUrl;
                script.async = true;
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        } else {
            return new Promise(resolve => {
                resolve(true);
            });
        }
    };

    protected createMapMarker = (
        markerType: string,
        markerId: string,
        markerContent: string = '',
        markerHoverContent: string = '',
        draggAble: boolean = true,
        coordinates: ICoordinates
    ): void => {
        const { latitude, longitude } = coordinates;
        return new ymaps.GeoObject(
            {
                geometry: {
                    type: 'Point',
                    coordinates: [latitude, longitude],
                },
                properties: {
                    iconContent: markerContent,
                    hintContent: markerHoverContent,
                    id: markerId,
                },
            },
            {
                preset: markerType,
                draggable: draggAble,
            }
        );
    };

    private checkInputValueAddress = (
        inputName: string,
        inputValue: string,
        isBlur: boolean = false
    ) => {
        let region =
            inputName === 'inputSourceAddress'
                ? getCurrentAddress(store.getState()).region
                : getDestinationAddress(store.getState()).region;
        const namePosition =
            inputName === 'inputSourceAddress'
                ? EYmData.USER_POSITION
                : EYmData.DESTINATION_POSITION;

        if (
            getDestinationAddress(store.getState()).region ===
            getDefaultRegion(store.getState())
        )
            region = getCurrentAddress(store.getState()).region;

        checkAddress<any>(inputValue, region)
            .then(geoData => {
                const geoObject = geoData.geoObjects.get(0);
                const {
                    description,
                    name,
                    text,
                } = geoObject.properties.getAll();
                const coordinates = geoObject.geometry.getCoordinates();
                const precision = geoObject.properties.get(
                    'metaDataProperty.GeocoderMetaData.precision'
                );
                if (precision === 'other') {
                    store.dispatch(setInputValid(inputName, false));
                } else {
                    store.dispatch(setInputValid(inputName, true));
                    if (isBlur) {
                        store.dispatch(setInputValue(inputName, text));
                        this.drawPosition(
                            namePosition,
                            {
                                latitude: coordinates[0],
                                longitude: coordinates[1],
                            },
                            {
                                region: description,
                                fullAddress: text,
                                shortAddress: name,
                            }
                        );
                    }
                }
            })
            .catch((error: Error) => console.log(error.message));
    };

    public ymButtonClickHandler = (buttonName: string) => {
        if ((buttonName = 'ok')) {
            store.dispatch(setButtonDisabled(buttonName, true));

            const inputs = ymInputs(store.getState());
            let isInputsValid = true;

            for (let inputName in inputs) {
                if (inputs[inputName].isValid !== true) {
                    store.dispatch(setInputValid(inputName, false));
                    isInputsValid = false;
                }
            }
            if (isInputsValid) {
                store.dispatch(setButtonDisabled(buttonName, false));
            }
        }
    };

    public ymInputBlurHandler = (
        inputName: string,
        inputValue: string,
        isYandexMapsAddressInput: boolean
    ) => {
        if (isYandexMapsAddressInput) {
            store.dispatch(setInputValue(inputName, inputValue));
            this.checkInputValueAddress(inputName, inputValue, true);
        }
    };

    public ymInputChangeHandler = (
        inputName: string,
        inputValue: string,
        validRegEx: RegExp[],
        maxLen: number,
        isYandexMapsAddressInput: boolean
    ) => {
        const isValid =
            validRegEx?.reduce((isValid: boolean, reg: RegExp) => {
                return isValid || reg.test(inputValue.trim());
            }, false) || false;

        if (isYandexMapsAddressInput) {
            store.dispatch(setInputValue(inputName, inputValue));
            this.checkInputValueAddress(inputName, inputValue);
        } else {
            store.dispatch(
                setInputValue(inputName, inputValue.trim().slice(0, maxLen))
            );
            store.dispatch(setInputValid(inputName, isValid));
        }

        const inputs = ymInputs(store.getState());

        let isInputsValid = true;

        for (let inputName in inputs) {
            if (inputs[inputName].isValid !== true) {
                isInputsValid = false;
            }
        }
        if (isInputsValid) {
            store.dispatch(setButtonDisabled('ok', false));
        }
    };
}

export default YandexMaps;
