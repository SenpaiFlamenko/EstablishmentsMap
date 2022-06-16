import { IMarker } from "../components/Map/Marker";
import { AppActionEnums, AppActions } from "./types";

const setPlace = (payload: IMarker): AppActions => ({
  type: AppActionEnums.SET_PLACE,
  payload,
});

export { setPlace };
