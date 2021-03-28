import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useStateSelector } from "Src/reducers";
import { Header } from "./../common/header";
import { allTournaments, getTournaments, getUsers } from "./actions";
import { TournamentCard } from "./tournament";
import { Tournament } from "Src/app-types";
import { iplMatches } from "./../utils/ipl";
import { EditTournament } from "./editTournament";
import { Users } from "Src/users/users";
import { Button, Grid, IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Skeleton } from "@material-ui/lab";
import CardLoader from "Src/common/CardLoader";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  headingMargin: {
    margin: "20px 0 20px 0",
  },
  alert: {
    margin: "auto",
  },
});

function HeaderTitle(props) {
  return (
    <Typography
      component="h1"
      variant="h6"
      className={props.headingMargin}
      align="left"
      color="textPrimary"
      gutterBottom
    >
      {props.text}
    </Typography>
  );
}

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

export const Tournaments = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { tournaments, users, tournamentLoader } = useStateSelector(
    (state) => state.TournamentState
  );

  const { isAdmin, data } = useStateSelector(({ authState }) => authState);

  const [newUser, setNewUser] = useState([] as any);
  const [open, setOpen] = useState(false);

  // console.log(iplMatches);
  // useEffect(() => {
  //   dispatch(allTournaments.success([...iplMatches]));
  // });

  useEffect(() => {
    if (!tournaments.length) {
      const queryBody = isAdmin
        ? { mobileNumber: "" }
        : { mobileNumber: data?.mobileNumber };
      dispatch(getTournaments(queryBody));
    }
    if (!users.length && tournaments[0] && isAdmin) {
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
  }, [tournaments]);

  return (
    <div className="tournaments">
      {!tournaments.length && (
        <Alert severity="warning" className={classes.alert}>
          You are not registered to any tournament.!
        </Alert>
      )}
      <Header />
      {!open && (
        <Grid item xs={12} sm={12} md={12}>
          <Container component="main" className="heroContent">
            {/* <HeaderTitle
            text="Tournaments Details"
            headingMargin={classes.headingMargin}
          /> */}
            {tournamentLoader && <CardLoader />}
            {!tournamentLoader && (
              <TournamentsCard
                tournaments={tournaments}
                users={users}
                isAdmin={isAdmin}
              />
            )}
            {isAdmin && <EditTournament />}
          </Container>
        </Grid>
      )}

      {open && (
        <div className="hideContent">
          {tournamentLoader && <CardLoader />}
          {!isAdmin && <Users users={newUser} />}
          {!!users.length && isAdmin && <Users users={users} />}
        </div>
      )}

      <div className="footer">
        <hr className="MuiDivider-root" />
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
