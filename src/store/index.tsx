import { createContext, useContext, ReactNode, useReducer } from "react";
import reducer from "./reducer";
import { AppStateContext, IAppContext } from "./types";

export const initialState: AppStateContext = {
  places: [],
  showAddButton: true,
};

export const AppContext = createContext<IAppContext>({
  state: initialState,
  dispatch: () => null,
});

export const useAppContext = (): IAppContext => useContext(AppContext);

interface Props {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
