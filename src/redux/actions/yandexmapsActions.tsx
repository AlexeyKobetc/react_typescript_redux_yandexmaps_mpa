import { ICoordinates, IAddress, EYmData } from "../types/interfaces";
import { YmActionType, YandexMapsActionsTypes } from "../types/types";

export const savePosition = (
  coordinates: ICoordinates,
  address: IAddress,
  namePosition: EYmData
): YmActionType => ({
  type: YandexMapsActionsTypes.SAVE_POSITION,
  payload: { namePosition, coordinates, address }
});
