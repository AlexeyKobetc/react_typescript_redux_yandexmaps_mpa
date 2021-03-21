import { EYmData, IAddress, ICoordinates, IGeoMarker, IPosition } from "../../../redux/types/interfaces";
import { store } from "../../../redux/Store";
import { savePosition } from "../../../redux/actions/yandexmapsActions";
import {
  getCurrentAddress,
  getCurrentCoordinates,
  getDestinationAddress,
  getDestinationCoordinates,
  isSetDestinationPosition
} from "../../../redux/selectors/yandexmapsSelectors";
import {
  adressToCoordsCodding,
  coordsToAddressCodding,
  createMapMarker,
  getUserPositionFromGeolocation,
  ymScriptLoad,
  ymScriptUrl
} from "./yandexmapsFunctions";

declare var ymaps: any;

class YandexMaps {
  _ym: any = null;

  _ymUserGeoMarker: IGeoMarker = {
    ymGeoMarker: null,
    icon: "islands#darkGreenStretchyIcon",
    id: "userGeoMarker",
    labelTextHeader: "Вы здесь: "
  };
  _ymDestinationGeoMarker: IGeoMarker = {
    ymGeoMarker: null,
    icon: "islands#yellowStretchyIcon",
    id: "destinationGeoMarker",
    labelTextHeader: "Вам нужно сюда: "
  };

  _currentMapZoom: number = 15;

  _isYmApiReady: boolean = false;
  _isYmScriptLoad: boolean = false;

  _initTimer: NodeJS.Timeout | null = null;

  set ym(ym: any) {
    this._ym = ym;
  }

  get ym() {
    return this._ym;
  }

  set currentMapZoom(currentMapZoom: number) {
    this._currentMapZoom = currentMapZoom;
  }

  get currentMapZoom() {
    return this._currentMapZoom;
  }

  set isYmApiReady(isReady: boolean) {
    this._isYmApiReady = isReady;
  }

  get isYmApiReady() {
    return this._isYmApiReady;
  }

  set isYmScriptLoad(isLoad: boolean) {
    this._isYmScriptLoad = isLoad;
  }

  get isYmScriptLoad() {
    return this._isYmScriptLoad;
  }

  constructor() {}

  initMapEnvironment = (ymDivContainer: HTMLDivElement) => {
    ymScriptLoad(ymScriptUrl).then((isLoad: boolean) => {
      this.isYmScriptLoad = isLoad;
      return ymaps
        .ready()
        .then(() => (this.isYmApiReady = true))
        .catch(() => (this.isYmApiReady = false));
    });

    this._initTimer = setInterval(() => {
      console.log("TICK");
      if (this.isYmApiReady && this.isYmScriptLoad && ymDivContainer) {
        console.log("API and YM Script Is Init ", this.isYmApiReady, this.isYmScriptLoad, ymDivContainer);
        clearInterval(this._initTimer as NodeJS.Timeout);
        this._initTimer = null;

        this.initMap(this.currentMapZoom, ymDivContainer);
      } else {
        console.log("API Initing ...");
      }
    }, 500);
  };

  initMap = (currentMapZoom: number, ymDivContainer: HTMLDivElement) => {
    const createMap = (coordinates: ICoordinates) => {
      return new ymaps.Map(ymDivContainer, {
        center: [coordinates.latitude, coordinates.longitude],
        zoom: currentMapZoom,
        controls: ["smallMapDefaultSet"],
        autoFitToViewport: "always"
      });
    };

    getUserPositionFromGeolocation().then((position: IPosition) => {
      store.dispatch(savePosition(position.coordinates, position.address, EYmData.USER_POSITION));
      if (this.ym === null) {
        this.ym = createMap(position.coordinates);
        this.drawPosition(EYmData.USER_POSITION);
        this.ym.events.add("contextmenu", this.mapHandler);
        this.ym.events.add("click", this.mapHandler);
        this.ym.events.add("boundschange", this.mapHandler);
      } else {
        this.ym.destroy();
        this.ym = null;
        this.ym = createMap(position.coordinates);
        if (this._ymUserGeoMarker.ymGeoMarker) {
          this.ym.geoObjects.add(this._ymUserGeoMarker.ymGeoMarker);
        } else {
          this.drawPosition(EYmData.USER_POSITION);
        }
        this._ymDestinationGeoMarker.ymGeoMarker &&
          this.ym.geoObjects.add(this._ymDestinationGeoMarker.ymGeoMarker);
        this.ym.events.add("contextmenu", this.mapHandler);
        this.ym.events.add("click", this.mapHandler);
        this.ym.events.add("boundschange", this.mapHandler);
      }
    });
  };

  mapHandler = (mapEvent: any): void => {
    const type = mapEvent.get("type");

    if (type === "contextmenu") {
      const mapClickCoordinates: number[] = mapEvent.get("coords");
      this.drawPosition(EYmData.DESTINATION_POSITION, {
        latitude: mapClickCoordinates[0],
        longitude: mapClickCoordinates[1]
      });
    }
    if (type === "click") {
      const mapClickCoordinates: number[] = mapEvent.get("coords");
      this.drawPosition(EYmData.USER_POSITION, {
        latitude: mapClickCoordinates[0],
        longitude: mapClickCoordinates[1]
      });
    }
    if (type === "boundschange") {
      this.currentMapZoom = mapEvent.get("newZoom");
    }
  };

  drawPosition = (namePosition: EYmData, coordinates?: ICoordinates, address?: IAddress): void => {
    if (coordinates && address) {
      store.dispatch(savePosition(coordinates, address, namePosition));
      this.drawMapMarker(namePosition, coordinates, address);
    } else if (!coordinates && !address) {
      this.drawMapMarker(namePosition);
    } else if (coordinates && !address) {
      coordsToAddressCodding<{ description: string; name: string; text: string }>(coordinates)
        .then(address => {
          const { description, name, text } = address;
          store.dispatch(
            savePosition(
              coordinates,
              { region: description, fullAddress: text, shortAddress: name },
              namePosition
            )
          );
          this.drawMapMarker(namePosition, coordinates, {
            region: description,
            fullAddress: text,
            shortAddress: name
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
                longitude: coordinates[1]
              },
              address,
              namePosition
            )
          );
          this.drawMapMarker(
            namePosition,
            {
              latitude: coordinates[0],
              longitude: coordinates[1]
            },
            address
          );
        })
        .catch((error: Error) => console.log(error.message));
    }
  };

  drawMapMarker = (namePosition: EYmData, coordinates?: ICoordinates, address?: IAddress) => {
    let mapMarker: IGeoMarker =
      namePosition === EYmData.USER_POSITION ? this._ymUserGeoMarker : this._ymDestinationGeoMarker;
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

    if (!mapMarker.ymGeoMarker) {
      mapMarker.ymGeoMarker = createMapMarker(
        mapMarker.icon,
        mapMarker.id,
        mapMarker.labelTextHeader + markerAddress.shortAddress,
        markerAddress.fullAddress,
        true,
        markerCoordinates
      );

      this.ym.geoObjects.add(mapMarker.ymGeoMarker);
      //this.ym.setCenter([latitude, longitude]);

      mapMarker.ymGeoMarker.events.add("dragend", (ymEvent: any) => {
        const target: any = ymEvent.get("target");
        const coordinates: number[] = target.geometry.getCoordinates();

        this.drawPosition(namePosition, {
          latitude: coordinates[0],
          longitude: coordinates[1]
        });
      });
      mapMarker.ymGeoMarker.events.add("click", () => {});
    } else {
      this.ym.geoObjects.each((placeMark: any) => {
        if (placeMark.properties.get("id") === mapMarker.id) {
          placeMark.geometry.setCoordinates([latitude, longitude]);
        }
      });
      mapMarker.ymGeoMarker.properties.set(
        "iconContent",
        mapMarker.labelTextHeader + markerAddress.shortAddress
      );
      mapMarker.ymGeoMarker.properties.set("hintContent", markerAddress.fullAddress);
      //this.ym.setCenter([latitude, longitude]);
    }
  };
}

export default YandexMaps;
