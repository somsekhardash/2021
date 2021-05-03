import { Tournament, Match, Action, User } from "Src/app-types";
import { resetStore } from "Src/auth/actions";
import {
  getAllTournamentsCreator,
  allUsers,
  setTournament,
  editMatch,
  filterMatch,
  selectMatch,
  allMatches,
  updateUser,
  matchVote,
  updateMatchCreator,
} from "./actions";

export interface State {
  tournaments: Array<Tournament> | Array<any>;
  selectedTournament: Tournament | any;
  selectedMatch: Match | null;
  users: Array<User> | [];
  tournamentLoader: boolean;
  matchLoader: boolean;
  userLoader: boolean;
  userError: string;
  tournamentError: string;
  updateUserLoader: boolean;
  updateUserError: string;
  updateUserSuccess: string;
  userVoteLoader: boolean;
  userVoteError: string;
  userVoteSuccess: string;
  updateMatchLoader: boolean;
  updateMatchSuccess: string;
  updateMatchError: string;
}

const defaultState: State = {
  tournaments: [],
  selectedTournament: null,
  selectedMatch: null,
  users: [],
  tournamentLoader: false,
  matchLoader: false,
  userLoader: false,
  userError: "",
  tournamentError: "",
  updateUserLoader: false,
  updateUserError: "",
  updateUserSuccess: "",
  userVoteLoader: false,
  userVoteError: "",
  userVoteSuccess: "",
  updateMatchLoader: false,
  updateMatchSuccess: "",
  updateMatchError: "",
};

const reducer = (
  state: State = defaultState,
  { type, payload }: Action
): State => {
  switch (type) {
    case updateMatchCreator.requesting().type:
      return {
        ...state,
        updateMatchLoader: true,
      };
    case updateMatchCreator.success({}).type:
      return {
        ...state,
        updateMatchLoader: false,
        updateMatchSuccess: "Match Updateed Successfully",
        updateMatchError: "",
      };
    case updateMatchCreator.failure({}).type:
      return {
        ...state,
        updateMatchLoader: false,
        updateMatchSuccess: "",
        updateMatchError: "Not Able To Update Match",
      };
    case matchVote.requesting().type:
      return {
        ...state,
        userVoteLoader: true,
        selectedMatch: null,
      };
    case matchVote.success({}).type:
      return {
        ...state,
        userVoteLoader: false,
        userVoteSuccess: "Your Vote Saved Successfully",
        userVoteError: "",
        selectedMatch: payload,
      };
    case matchVote.failure({}).type:
      return {
        ...state,
        userVoteLoader: false,
        userVoteSuccess: "",
        userVoteError: "Not Able Save Your Vote",
        selectedMatch: null,
      };
    case updateUser.requesting().type:
      return {
        ...state,
        updateUserLoader: true,
      };
    case updateUser.success({}).type:
      return {
        ...state,
        updateUserLoader: false,
        updateUserSuccess: "User Data Saved Successfully",
        updateUserError: "",
      };
    case updateUser.failure({}).type:
      return {
        ...state,
        updateUserLoader: false,
        updateUserSuccess: "",
        updateUserError: "Not Able To Update User",
      };
    case getAllTournamentsCreator.requesting().type:
      return {
        ...state,
        tournamentLoader: true,
        tournamentError: "",
      };
    case getAllTournamentsCreator.success({}).type:
      return {
        ...state,
        tournamentLoader: false,
        tournaments: [...payload],
        tournamentError: "",
      };
    case getAllTournamentsCreator.failure({}).type:
      return {
        ...state,
        tournamentLoader: false,
        tournamentError: "Not able to fetch tournaments",
      };
    case allUsers.requesting().type:
      return {
        ...state,
        userLoader: true,
        userError: "",
      };
    case allUsers.success({}).type:
      return {
        ...state,
        userLoader: false,
        users: [...payload],
        userError: "",
      };
    case allUsers.failure({}).type:
      return {
        ...state,
        userLoader: false,
        userError: "Not able to fetch user",
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
        userVoteSuccess: "",
        userVoteError: "",
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
