import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useStateSelector } from "src/reducers";
import { MatchCard } from "./MatchCard";
import { Header } from "src/common/header";
import { useDispatch } from "react-redux";
import { CreateMatch } from "./createMatch";
import { MatchFilter } from "./matchFilter";
import "./index.scss";
import CardLoader from "src/common/CardLoader";
import {
  Avatar,
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  LinearProgress,
  SwipeableDrawer,
} from "@material-ui/core";
import HideMe from "src/common/useFooter";
import useTournaments from "src/utils/useTournaments";
import { Alert } from "@material-ui/lab";
import Loader from "src/common/Loader";

export const MatchCards = () => {
  const { isAdmin, data } = useStateSelector((state) => state.authState);
  const { tournamentLoader, tournamentError } = useStateSelector(
    (state) => state.TournamentState
  );
  const { tournamentID } = useParams() as any;
  const { _selectedTournament } = useTournaments(tournamentID);
  const [drawer, toggleDrawer] = useState(false);
  const [matches, setMatches] = useState([] as any);
  useEffect(() => {
    if (_selectedTournament) {
      // const id = _selectedTournament.matches.find((match) => !match.isStarted)
      //   ._id;
      setMatches([..._selectedTournament.matches]);
      // const element = document.getElementById(id);
      // element && element.scrollIntoView({ behavior: "smooth" });
    }
  }, [_selectedTournament]);

  return (
    <div className="MatchCards">
      <Header />
      <HideMe visible={tournamentLoader} duration={0}>
        <Loader />
      </HideMe>
      <HideMe visible={tournamentError} duration={0}>
        <Alert style={{ flex: 1 }} severity="error">
          {tournamentError}
        </Alert>
      </HideMe>
      <div className="content">
        <div className="container">
          {matches.map((match: any, index: number) => (
            <MatchCard
              key={index}
              match_id={index}
              match={match}
              selectedTournament={_selectedTournament}
            />
          ))}
          <HideMe visible={isAdmin} duration={0}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CreateMatch
                selectedTournament={_selectedTournament}
                title="Create Match"
              />
            </div>
          </HideMe>
        </div>
      </div>

      <SwipeableDrawer
        anchor="left"
        className="match-drawer"
        open={drawer}
        onClose={() => toggleDrawer(!drawer)}
        onOpen={() => toggleDrawer(drawer)}
      >
        <div className="match-drawer-body">
          <Avatar
            alt={data?.userName}
            variant="square"
            sizes="large"
            src={`https://api.multiavatar.com/${data?.userName}.svg`}
          />

          <div className="nav-list">
            <Link
              to={`/tournament-result/${_selectedTournament?._id}`}
              className="btn btn-primary"
            >
              <Chip
                avatar={<Avatar>TR</Avatar>}
                label="Tournament Result"
                clickable
                color="primary"
                variant="outlined"
              />
            </Link>
            <Link to={`/notifications`} className="btn btn-primary">
              <Chip
                avatar={<Avatar>N</Avatar>}
                label="Notifications"
                clickable
                color="primary"
                variant="outlined"
              />
            </Link>
          </div>

          <MatchFilter />
        </div>
      </SwipeableDrawer>

      <div className="footer">
        <Button
          className="link"
          style={{ color: "white" }}
          onClick={() => toggleDrawer(!drawer)}
        >
          Options
        </Button>
      </div>
    </div>
  );
};
