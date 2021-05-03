import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useStateSelector } from "Src/reducers";
import { Header } from "./../common/header";
import { getAllTournamentsCreator, getTournaments, getUsers } from "./actions";
import { TournamentCard } from "./tournament";
import { Tournament } from "Src/app-types";
import { iplMatches } from "./../utils/ipl";
import { EditTournament } from "./editTournament";
import { Users } from "Src/users/users";
import {
  Button,
  Grid,
  IconButton,
  LinearProgress,
  SwipeableDrawer,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CardLoader from "Src/common/CardLoader";
import HideMe from "./../common/useFooter";

const useStyles = makeStyles({
  headingMargin: {
    margin: "20px 0 20px 0",
  },
  alert: {
    margin: "auto",
  },
});

function TournamentsCard(props) {
  return (
    <div className="tournaments-card">
      {props.tournaments.map((tournament: Tournament, index: number) => (
        <TournamentCard
          key={index}
          isAdmin={props.isAdmin}
          tournament={tournament}
          users={tournament.users}
          userArray={props.users}
        />
      ))}
    </div>
  );
}

function LoaderTournament(props) {
  return (
    <HideMe visible={props.tournamentLoader} duration={0}>
      <LinearProgress />
      <br />
      <br />
      <CardLoader />
    </HideMe>
  );
}

function NotRegisteredUser(props) {
  return (
    <HideMe visible={!props.length} duration={0}>
      <Alert severity="warning" className={props.alert}>
        <p>You are not registered to any tournament.</p>
        <p>Wait untill registered by the Admin.</p>
      </Alert>
    </HideMe>
  );
}

export const Tournaments = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    tournaments,
    users,
    tournamentLoader,
    tournamentError,
    userError,
  } = useStateSelector((state) => state.TournamentState);
  const { isAdmin, data } = useStateSelector(({ authState }) => authState);
  const [newUser, setNewUser] = useState([] as any);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!tournaments.length) {
      const queryBody = isAdmin
        ? { mobileNumber: "" }
        : { mobileNumber: data?.mobileNumber };
      dispatch(getTournaments(queryBody));
    }
    if (!users.length && isAdmin) {
      const queryBody = { tournamentId: "" };
      dispatch(getUsers(queryBody));
    }

    if (tournaments.length) {
      let tournament: any = tournaments.map((tournament) => tournament.users);
      console.log(tournament.flat());

      let updatedUser = Array.from(
        new Set(tournament.flat().map((a) => a._id))
      ).map((id) => {
        return tournament.flat().find((a) => a._id === id);
      });
      setNewUser([...updatedUser]);
    }
  }, []);

  return (
    <div className="tournaments">
      <Header />
      <div className="content">
        <LoaderTournament
          tournamentLoader={tournamentLoader}
        ></LoaderTournament>
        <HideMe visible={tournamentError}>
          <Alert severity="error">{tournamentError}</Alert>
        </HideMe>
        <HideMe visible={!tournamentLoader && !tournamentError} duration={0}>
          <NotRegisteredUser
            alert={classes.alert}
            length={tournaments.length}
          ></NotRegisteredUser>
          <HideMe visible={tournaments.length} duration={0}>
            <Grid item xs={12} sm={12} md={12}>
              <Container component="main" className="heroContent">
                <TournamentsCard
                  tournaments={tournaments}
                  users={users}
                  isAdmin={isAdmin}
                />
                {isAdmin && <EditTournament />}
              </Container>
            </Grid>
          </HideMe>
        </HideMe>

        <SwipeableDrawer
          anchor="left"
          className="user-drawer"
          open={open}
          onClose={() => setOpen(!open)}
          onOpen={() => setOpen(open)}
        >
          <div className="hideContent">
            <HideMe visible={userError} duration={0}>
              <Alert style={{ flex: 1 }} severity="error">
                {userError}
              </Alert>
            </HideMe>
            <HideMe visible={!isAdmin} duration={0}>
              <Users users={newUser} />
            </HideMe>
            <HideMe visible={!!users.length && isAdmin} duration={0}>
              <Users users={users} />
            </HideMe>
          </div>
        </SwipeableDrawer>
      </div>
      <div className="footer">
        <Button
          className="link"
          style={{ color: "white" }}
          onClick={() => setOpen(!open)}
        >
          Users
        </Button>
      </div>
    </div>
  );
};
