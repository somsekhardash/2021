import { combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import appReducer, { State as AppState } from "src/app/reducer";
import authReducer, { State as AuthState } from "src/auth/reducer";
import tournamentReducer, {
  State as TournamentState,
} from "src/tournaments/reducer";

export type RootState = {
  appState: AppState;
  authState: AuthState;
  TournamentState: TournamentState;
};

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers<RootState>({
  appState: appReducer,
  authState: authReducer,
  TournamentState: tournamentReducer,
});

export default rootReducer;
