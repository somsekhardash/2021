import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import { useStateSelector } from "Src/reducers";
import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  StylesProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  avatar: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
});

export default function BasicChart() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [base, setBase] = React.useState(10);
  const { selectedTournament } = useStateSelector(
    ({ TournamentState }) => TournamentState
  );
  const { users } = selectedTournament;

  const matches = selectedTournament?.matches.filter((team) => {
    return team.isStarted == true;
  });

  const getTeamDetails = (match) => {
    const totalPoints = users.length * base;
    const team1Squard = [
      ...match.team1Squard.filter((player) =>
        users.map((user) => user._id).includes(player._id)
      ),
    ];
    const team2Squard = [
      ...match.team2Squard.filter((player) =>
        users.map((user) => user._id).includes(player._id)
      ),
    ];

    const totalPlayed = [...team1Squard, ...team2Squard];
    const totalNotPlayed = [
      ...users.filter(
        (user) => !totalPlayed.map((tPlayed) => tPlayed._id).includes(user._id)
      ),
    ];
    const winnerTeam =
      match.winner == match.team1 ? [...team1Squard] : [...team2Squard];

    const point = totalPoints / winnerTeam.length;
    return {
      winners: [...winnerTeam],
      notPlayed: [...totalNotPlayed],
      point,
    };
  };

  const getMatchDetails = (user: any) => {
    let newUser = { ...user };
    newUser.win = 0;
    newUser.lost = 0;
    newUser.notPlayed = 0;
    newUser.score = 0;
    newUser.chart = [];
    matches.forEach((match) => {
      const { winners, notPlayed, point } = getTeamDetails(match);
      if (notPlayed.map((player) => player._id).includes(user._id)) {
        newUser.notPlayed = newUser.notPlayed + 1;
      } else if (winners.map((player) => player._id).includes(user._id)) {
        newUser.win = newUser.win + 1;
        newUser.score = newUser.score + point;
      } else newUser.lost = newUser.lost + 1;
      newUser.chart.push(newUser.score);
    });
    return newUser;
  };

  const usersObj = users.reduce((accumulator, currentValue) => {
    accumulator.push(getMatchDetails(currentValue));
    return accumulator;
  }, []);

  console.log(usersObj);

  const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const datasets = usersObj.map((user, index) => {
    return {
      data: user.chart,
      label: user.userName,
      fill: false,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: getRandomColor(),
      borderWidth: 2,
    };
  });

  const state = {
    labels: matches.map((match, index) => `Match-${index + 1}`),
    datasets: datasets,
  };

  return (
    <div className="points-chart">
      <Button
        variant="outlined"
        style={{ marginTop: 20 }}
        color="primary"
        onClick={() => setOpen(true)}
      >
        Points Chart
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Result Chart</Typography>
          </Toolbar>
        </AppBar>
        <div className="simple-chart">
          <Line data={state} />
        </div>
      </Dialog>
    </div>
  );
}
