import { Tournament, Match, Action, User } from "Src/app-types";
import { resetStore } from "Src/auth/actions";
import {
  allTournaments,
  allUsers,
  setTournament,
  editMatch,
  filterMatch,
  selectMatch,
  allMatches,
} from "./actions";

export interface State {
  tournaments: Array<Tournament> | [];
  selectedTournament: Tournament | any;
  selectedMatch: Match | null;
  users: Array<User> | [];
  tournamentLoader: boolean;
  matchLoader: boolean;
  userLoader: boolean;
}

const defaultState: State = {
  tournaments: [],
  selectedTournament: null,
  selectedMatch: null,
  users: [],
  tournamentLoader: false,
  matchLoader: false,
  userLoader: false,
};

const reducer = (
  state: State = defaultState,
  { type, payload }: Action
): State => {
  switch (type) {
    case allTournaments.requesting().type:
      return {
        ...state,
        tournamentLoader: true,
      };
    case allTournaments.success({}).type:
      return {
        ...state,
        tournamentLoader: false,
        tournaments: [...payload],
      };
    case allUsers.requesting().type:
      return {
        ...state,
        userLoader: true,
      };
    case allUsers.success({}).type:
      return {
        ...state,
        userLoader: false,
        users: [...payload],
      };
    case allUsers.failure({}).type:
      return {
        ...state,
        userLoader: false,
      };
    case allMatches.requesting().type:
      return {
        ...state,
        matchLoader: true,
      };
    case allMatches.success({}).type:
      return {
        ...state,
        matchLoader: false,
      };
    case allMatches.failure({}).type:
      return {
        ...state,
        matchLoader: false,
      };
    case setTournament().type: {
      return {
        ...state,
        selectedTournament: payload,
      };
    }
    case editMatch().type: {
      return {
        ...state,
        selectedMatch: payload,
      };
    }
    case selectMatch().type: {
      let newMatch: any = { ...state.selectedTournament };
      let index = newMatch.matches.findIndex(
        (match) => match._id == payload?._id
      );
      newMatch.matches[index] = payload;
      console.log(newMatch);
      return {
        ...state,
        selectedTournament: { ...newMatch },
      };
    }
    case filterMatch().type: {
      const selectedTournament = state.tournaments.find(
        (tournament: any) => tournament._id == state.selectedTournament._id
      );
      let _selectedMatches: any = null;
      if (payload.turboSearch) {
        _selectedMatches = {
          ...selectedTournament,
        }?.matches?.filter((match: any) =>
          [match?.team1, match?.team2].some((match) =>
            payload.team.includes(match)
          )
        );
      } else {
        _selectedMatches = {
          ...selectedTournament,
        }?.matches?.filter((match: any) =>
          payload.team.every((team: string) => {
            return [match?.team1, match?.team2].indexOf(team) > -1;
          })
        );
      }
      return {
        ...state,
        selectedTournament: {
          ...state.selectedTournament,
          matches: _selectedMatches,
        },
      };
    }
    case resetStore().type:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};

export default reducer;
