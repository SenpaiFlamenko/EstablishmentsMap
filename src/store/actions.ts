import { IMarker } from "../components/Map/Marker";
import { AppActionEnums, AppActions } from "./types";

const setPlace = (payload: IMarker): AppActions => ({
  type: AppActionEnums.SET_PLACE,
  payload,
});

const removePlace = (payload: IMarker): AppActions => ({
  type: AppActionEnums.REMOVE_PLACE,
  payload,
});

const showAddButton = (payload: boolean): AppActions => ({
  type: AppActionEnums.SHOW_ADD_BUTTON,
  payload,
});

export { setPlace, removePlace, showAddButton };
