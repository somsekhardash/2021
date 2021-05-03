import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useStateSelector } from "Src/reducers";
import { getTournaments, onSelectTournament } from "Src/tournaments/actions";

export default function useTournaments(tournamentID) {
  const { data, isAdmin } = useStateSelector((state) => state.authState);
  const { tournaments } = useStateSelector((state) => state.TournamentState);
  const { selectedTournament } = useStateSelector(
    (state) => state.TournamentState
  );
  const [_selectedTournament, set_SelectedTournament] = useState<any>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedTournament) {
      if (!tournaments.length) {
        const queryBody = isAdmin
          ? { mobileNumber: "" }
          : { mobileNumber: data?.mobileNumber };
        dispatch(getTournaments(queryBody));
      } else {
        const theTournament = tournaments.find((tournament: any) => {
          return tournament._id == tournamentID;
        });
        if (!selectedTournament && theTournament) {
          set_SelectedTournament(theTournament);
          dispatch(
            onSelectTournament({
              selectedTournament: theTournament,
            })
          );
        }
      }
    } else {
      set_SelectedTournament(selectedTournament);
    }
  }, [tournamentID, tournaments, selectedTournament]);
  return { _selectedTournament };
}
