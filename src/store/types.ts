import { Dispatch } from "react";
import { IMarker } from "../components/Map/Marker";

export interface AppStateContext {
  places: IMarker[];
  showAddButton: boolean;
}

export interface IAppContext {
  state: AppStateContext;
  dispatch: Dispatch<AppActions>;
}

export enum AppActionEnums {
  SET_PLACE = "SET_PLACE",
  REMOVE_PLACE = "REMOVE_PLACE",
  SHOW_ADD_BUTTON = "SHOW_ADD_BUTTON",
}

interface SetPlace {
  type: AppActionEnums.SET_PLACE;
  payload: IMarker;
}

interface RemovePlace {
  type: AppActionEnums.REMOVE_PLACE;
  payload: IMarker;
}

interface ShowAddButton {
  type: AppActionEnums.SHOW_ADD_BUTTON;
  payload: boolean;
}

export type AppActions = SetPlace | RemovePlace | ShowAddButton;
