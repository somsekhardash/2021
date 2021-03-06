import { Tournament, Match } from "./../app-types";
import { publicRequest } from "src/utils/network";
import { networkActionsCreator, ActionsCreator } from "src/utils/creators";

export const getAllTournamentsCreator = networkActionsCreator("TOURNAMENTS");
export const allUsers = networkActionsCreator("USERS");
export const updateUser = networkActionsCreator("UPDATE-USER");
export const updateMatchCreator = networkActionsCreator("UPDATE-MATCH");
export const allMatches = networkActionsCreator("MATCH");
export const matchVote = networkActionsCreator("ON-VOTE");
export const setTournament = ActionsCreator("SELECT-TOURNAMENT");
export const editMatch = ActionsCreator("EDIT-MATCH");
export const filterMatch = ActionsCreator("FILTER-MATCH");
export const selectMatch = ActionsCreator("SELECT-MATCH");

export type getTournamentBody = {
  mobileNumber: string;
};

export type getUsersBody = {
  tournamentId: string;
};

export type createTournamentBody = {
  title: string;
};

export type deleteTournamentBody = {
  tournamentId: string;
};

export type deleteUserBody = {
  userId: string;
};

export type addUserTournamentBody = {
  tournamentId: string;
  users: string[];
};

export type selectTournament = {
  selectedTournament: Tournament | null;
};

export type selectMatch = {
  selectedMatch: Match | null;
};

export type updateUserBody = {
  userId: string;
  userName: string;
  password: string;
};

export type filterMatchBody = {
  team: string[];
  turboSearch: boolean;
};

export type voteMatchBody = {
  tournamentId: string;
  _id: string;
  team1: string;
  team2: string;
  time: string;
  venue: string;
  winner: string;
  team1Squard: string[];
  team2Squard: string[];
  isStarted: boolean;
  selectedTeam: string;
  userdata: any;
};

export type updateMatchBody = {
  tournamentId: string;
  _id: string;
  team1: string;
  team2: string;
  time: string;
  venue: string;
  winner: string;
  team1Squard: string[];
  team2Squard: string[];
  isStarted: boolean;
};

export const getTournaments =
  (body: getTournamentBody): any =>
  async (dispatch: any) =>
    getAllTournamentsRequest(body, "get-tournaments", dispatch);

export const getUsers =
  (body: getUsersBody): any =>
  async (dispatch: any) =>
    getAllUsersRequest(body, "get-users", dispatch);

export const createTournament =
  (body: createTournamentBody): any =>
  async (dispatch: any) =>
    createTournamentsRequest(body, "tournament-register", dispatch);

export const deleteTournament =
  (body: deleteTournamentBody): any =>
  async (dispatch: any) =>
    deleteTournamentsRequest(body, "delete-tournament", dispatch);

export const deleteUser =
  (body: deleteUserBody): any =>
  async (dispatch: any) =>
    deleteUserRequest(body, "delete-user", dispatch);

export const addUserTournament =
  (body: addUserTournamentBody): any =>
  async (dispatch: any) =>
    createEditUserTournamentsRequest(body, "update-tournament-user", dispatch);

export const onSelectTournament =
  (body: selectTournament): any =>
  async (dispatch: any) =>
    dispatch(setTournament(body.selectedTournament));

export const onEditMatch =
  (body: selectMatch): any =>
  async (dispatch: any) =>
    dispatch(editMatch(body.selectedMatch));

export const onSelectMatch =
  (body: selectMatch): any =>
  async (dispatch: any) =>
    dispatch(selectMatch(body.selectedMatch)); //som

export const updateMatch =
  (body: updateMatchBody): any =>
  async (dispatch: any) =>
    updateMatchRequest(body, "update-match", dispatch);

export const voteMatch =
  (body: voteMatchBody): any =>
  async (dispatch: any) =>
    voteRequest(body, "vote-match", dispatch);

export const onCreateMatch =
  (body: updateMatchBody): any =>
  async (dispatch: any) =>
    updateMatchRequest(body, "create-match", dispatch);

export const updateUserCall =
  (body: updateUserBody): any =>
  async (dispatch: any) =>
    updateUserRequest(body, "update-user", dispatch);

export const onFilterMatch =
  (body: filterMatchBody): any =>
  async (dispatch: any) =>
    dispatch(filterMatch(body));

export const onDeleteMatch =
  (body: selectMatch): any =>
  async (dispatch: any) =>
    deleteMatchRequest(body, "delete-match", dispatch);

export const getAllTournamentsRequest = async (
  body: any,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(getAllTournamentsCreator.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "GET",
      params: { ...body },
    });
    dispatch(getAllTournamentsCreator.success([...response.data.data]));
  } catch (error) {
    dispatch(getAllTournamentsCreator.failure(error));
  }
};

export const createTournamentsRequest = async (
  body: any,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(getAllTournamentsCreator.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "POST",
      data: body,
    });
    dispatch(getAllTournamentsCreator.success([...response.data.data]));
    location.reload();
  } catch (error) {
    dispatch(getAllTournamentsCreator.failure(error));
  }
};

export const deleteTournamentsRequest = async (
  body: any,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(getAllTournamentsCreator.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "DELETE",
      data: body,
    });
    dispatch(getAllTournamentsCreator.success([...response.data.data]));
  } catch (error) {
    dispatch(getAllTournamentsCreator.failure(error));
  }
};

export const getAllUsersRequest = async (
  body: any,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(allUsers.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "GET",
      params: { ...body },
    });
    dispatch(allUsers.success([...response.data.data]));
  } catch (error) {
    dispatch(allUsers.failure(error));
  }
};

export const deleteUserRequest = async (
  body: any,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(allUsers.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "DELETE",
      data: body,
    });
    dispatch(allUsers.success([...response.data.data]));
  } catch (error) {
    dispatch(allUsers.failure(error));
  }
};

export const createEditUserTournamentsRequest = async (
  body: any,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(getAllTournamentsCreator.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "POST",
      data: body,
    });
    dispatch(getAllTournamentsCreator.success([...response.data.data]));
    // location.reload();
  } catch (error) {
    dispatch(getAllTournamentsCreator.failure(error));
  }
};

export const updateMatchRequest = async (
  body: any,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(updateMatchCreator.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "POST",
      data: body,
    });
    dispatch(updateMatchCreator.success(response));
    // location.reload();
  } catch (error) {
    dispatch(updateMatchCreator.failure(error));
  }
};

export const voteRequest = async (
  body: any,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(matchVote.requesting());
    let player = (({ _id, userName, mobileNumber }) => ({
      _id,
      userName,
      mobileNumber,
    }))(body.userdata);
    body.player = player;

    const response = await publicRequest({
      url: endpoint,
      method: "POST",
      data: body,
    });
    dispatch(matchVote.success(body));
  } catch (error) {
    dispatch(matchVote.failure(error));
  }
};

export const updateUserRequest = async (
  body: any,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(updateUser.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "POST",
      data: body,
    });
    dispatch(updateUser.success(response));
    // location.reload();
  } catch (error) {
    dispatch(updateUser.failure(error));
  }
};

export const deleteMatchRequest = async (
  body: any,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(allMatches.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "DELETE",
      data: body.selectedMatch,
    });
    dispatch(allMatches.success([...response.data.data]));
    // location.reload();
  } catch (error) {
    dispatch(allMatches.failure(error));
  }
};
