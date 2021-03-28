import React, { useEffect } from "react";
import { useStateSelector } from "Src/reducers";
import csk from "Src/images/csk.jpg";
import dc from "Src/images/dc.jpg";
import kkr from "Src/images/kkr.jpg";
import mi from "Src/images/mi.jpg";
import pk from "Src/images/pk.jpg";
import rcb from "Src/images/rcb.jpg";
import rr from "Src/images/rr.jpg";
import srh from "Src/images/srh.jpg";

export const allMatches = (): any => {
  const [matches, setMatches]: any = React.useState([]);
  const imageMap: any = { csk, dc, kkr, mi, pk, rcb, rr, srh };

  const { selectedTournament, tournaments } = useStateSelector(
    (state) => state.TournamentState
  );

  useEffect(() => {
    if (selectedTournament) {
      const _selectedTournament = tournaments.find((tournament) => {
        return tournament._id == selectedTournament._id;
      });
      const iplTeams = _selectedTournament?.matches?.reduce(function (
        accumulator: any,
        currentValue: any
      ) {
        return [
          ...new Set([...accumulator, currentValue.team2, currentValue.team1]),
        ];
      },
      new Array());
      setMatches([...iplTeams]);
    }
  }, [selectedTournament]);

  return { matches, imageMap };
};
