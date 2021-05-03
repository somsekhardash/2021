import React from "react";
import { useParams } from "react-router-dom";
import BasicChart from "Src/tournaments/Charts";
import EnhancedTable from "Src/tournaments/resultsNew";
import useTournaments from "Src/utils/useTournaments";
import HideMe from "Src/common/useFooter";
import { Header } from "./header";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function TournamentResult() {
  let { tournamentID } = useParams() as any;
  const { _selectedTournament } = useTournaments(tournamentID);
  return (
    <div className="tournament-result">
      <Header />
      <HideMe visible={_selectedTournament}>
        <EnhancedTable selectedTournament={_selectedTournament} />
        <BasicChart selectedTournament={_selectedTournament} />
      </HideMe>
      <div className="footer">
        <Button className="link" style={{ color: "white" }}>
          <Link to={`/`} className="btn btn-primary">
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
}
