import { Dispatch } from "react";
import { IMarker } from "../components/Map/Marker";

export interface AppStateContext {
  places: IMarker[];
}

export interface IAppContext {
  state: AppStateContext;
  dispatch: Dispatch<AppActions>;
}

export enum AppActionEnums {
  SET_PLACE = "SET_PLACE",
}

interface SetPlace {
  type: AppActionEnums.SET_PLACE;
  payload: IMarker;
}

export type AppActions = SetPlace;
