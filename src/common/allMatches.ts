import React, { useEffect } from "react";
import { useStateSelector } from "src/reducers";
import csk from "src/images/csk.jpg";
import dc from "src/images/dc.jpg";
import kkr from "src/images/kkr.jpg";
import mi from "src/images/mi.jpg";
import pk from "src/images/pk.jpg";
import rcb from "src/images/rcb.jpg";
import rr from "src/images/rr.jpg";
import srh from "src/images/srh.jpg";

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
