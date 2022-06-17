import { AppStateContext, AppActions, AppActionEnums } from "./types";

const reducer = (
  state: AppStateContext,
  action: AppActions
): AppStateContext => {
  switch (action.type) {
    case AppActionEnums.SET_PLACE:
      return {
        ...state,
        places: [...state.places, action.payload],
      };

    case AppActionEnums.REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(
          (place) =>
            place.lng !== action.payload.lng && place.lat !== action.payload.lat
        ),
      };
    case AppActionEnums.SHOW_ADD_BUTTON:
      return {
        ...state,
        showAddButton: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
