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
    default:
      return state;
  }
};

export default reducer;
