import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useStateSelector } from "Src/reducers";
import { Tournament } from "Src/app-types";
import { MatchCard } from "./match";
import { iplMatches } from "Src/utils/ipl";
import { Header } from "Src/common/header";
import { useDispatch } from "react-redux";
import { getTournaments, onSelectTournament } from "Src/tournaments/actions";
import { EditMatch } from "./editMatch";
import { CreateMatch } from "./createMatch";
import { MatchFilter } from "./matchFilter";
import "./index.scss";
import EnhancedTable from "Src/tournaments/resultsNew";
import CardLoader from "Src/common/CardLoader";
import { Skeleton } from "@material-ui/lab";
import { Button, SwipeableDrawer } from "@material-ui/core";
import BasicChart from "Src/tournaments/Charts";

function LeftContent() {
  return (
    <div
      style={{
        flexDirection: "column",
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        width: "100%",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <EnhancedTable />
        <BasicChart />
      </div>
      <MatchFilter />
    </div>
  );
}

export const MatchCards = () => {
  const dispatch = useDispatch();
  const { tournaments } = useStateSelector((state) => state.TournamentState);
  const { data, isAdmin } = useStateSelector((state) => state.authState);
  const {
    selectedTournament,
    selectedMatch,
    tournamentLoader,
  } = useStateSelector((state) => state.TournamentState);
  let { tournamentID } = useParams() as any;
  const [matches, setMatches] = useState([] as any);
  const [toggleDrawer, settoggleDrawer] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!tournaments.length) {
      const queryBody = isAdmin
        ? { mobileNumber: "" }
        : { mobileNumber: data?.mobileNumber };
      dispatch(getTournaments(queryBody));
    } else {
      const _selectedTournament = tournaments.find((tournament: any) => {
        return tournament._id == tournamentID;
      });
      if (!selectedTournament && _selectedTournament) {
        setMatches(_selectedTournament.matches);
        dispatch(
          onSelectTournament({
            selectedTournament: _selectedTournament,
          })
        );
      }
    }
  }, [tournaments]);

  const afterSendData = (type, message) => {
    console.log("DATA SENT", type, message);
  };

  useEffect(() => {
    if (selectedTournament) {
      setMatches(selectedTournament.matches);
    }
  }, [selectedTournament]);

  return (
    <div className="MatchCards">
      <Header />
      {/* {!tournamentLoader && <EnhancedTable />} */}
      {/* {tournamentLoader && <Skeleton variant="text" width={210} />} */}
      {/* {selectedTournament && <MatchFilter />} */}
      <div style={{ display: "flex" }}>
        {selectedTournament && open && <LeftContent></LeftContent>}
        {!open && (
          <div className="container">
            {matches?.map((match: any, index: number) =>
              match ? (
                <MatchCard
                  key={index}
                  match_id={index}
                  match={match}
                  selectedTournament={selectedTournament}
                />
              ) : (
                <CardLoader key={index} />
              )
            )}
            {selectedMatch && (
              <EditMatch
                selectedTournament={selectedTournament}
                selectedMatch={selectedMatch}
                title="Edit Match"
              />
            )}

            {isAdmin && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <CreateMatch
                  selectedTournament={selectedTournament}
                  title="Create Match"
                />
              </div>
            )}
            {tournamentLoader &&
              [1, 2, 3].map(() => {
                return <CardLoader />;
              })}
          </div>
        )}
      </div>
      <div className="footer">
        <Button
          className="link"
          style={{ color: "white" }}
          onClick={() => setOpen(!open)}
        >
          Options
        </Button>
      </div>
    </div>
  );
};
