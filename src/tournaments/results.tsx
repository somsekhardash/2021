import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, ValueGetterParams } from "@material-ui/data-grid";
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

const useStyles = makeStyles({
  avatar: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
});

function createData(
  id: number,
  name: string,
  win: number,
  lose: number,
  notPlayed: number,
  score: number
) {
  return { id, name, win, lose, notPlayed, score };
}

export default function BasicTable() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { selectedTournament } = useStateSelector(
    ({ TournamentState }) => TournamentState
  );

  const matches = selectedTournament?.matches.filter((team) => {
    return team.isStarted == true;
  });

  const base = 10;

  const getName = (id) => {
    const user = selectedTournament.users.find((user) => {
      return user._id === id;
    });
    return user.userName;
  };

  const users = selectedTournament?.users.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?._id] = {
        score: base,
        win: 0,
        lose: 0,
        notPlayed: 0,
      };
      return accumulator;
    },
    {}
  );

  matches?.forEach((match) => {
    const totalUsers = selectedTournament.users.length;
    const team1Squard = match.team1Squard.length;
    const team2Squard = match.team2Squard.length;

    const notPlayedSquard = selectedTournament.users.filter((user) => {
      return (
        !match.team1Squard.includes(user._id) &&
        !match.team2Squard.includes(user._id)
      );
    });

    const notPlayed = notPlayedSquard.length;

    if (match.team1 === match.winner) {
      if (team1Squard) {
        const prize = ((notPlayed + team2Squard) * base) / team1Squard;
        match.team1Squard.forEach((team) => {
          users[team].score = users[team].score + prize;
          users[team].win = users[team].win + 1;
        });
        match.team2Squard.forEach((team) => {
          users[team].score = users[team].score - prize;
          users[team].lose = users[team].lose + 1;
        });
        notPlayedSquard.forEach((team) => {
          users[team._id].score = users[team._id].score - prize;
          users[team._id].notPlayed = users[team._id].notPlayed + 1;
        });
      } else {
        const prize = (notPlayed + team2Squard + team1Squard) * base;
        match.team1Squard.forEach((team) => {
          users[team].score = users[team].score + prize;
          users[team].lose = users[team].lose + 1;
        });
        match.team2Squard.forEach((team) => {
          users[team].score = users[team].score + prize;
          users[team].lose = users[team].lose + 1;
        });
        notPlayedSquard.forEach((team) => {
          users[team._id].notPlayed = users[team._id].notPlayed + 1;
        });
      }
    } else {
      const prize = ((notPlayed + team1Squard) * base) / team2Squard;
      if (team2Squard) {
        match.team2Squard.forEach((team) => {
          users[team].score = users[team].score + prize;
          users[team].win = users[team].win + 1;
        });
        match.team1Squard.forEach((team) => {
          users[team].score = users[team].score - prize;
          users[team].lose = users[team].lose + 1;
        });
        notPlayedSquard.forEach((team) => {
          users[team._id].score = users[team._id].score - prize;
          users[team._id].notPlayed = users[team._id].notPlayed + 1;
        });
      } else {
        const prize = (notPlayed + team2Squard + team1Squard) * base;
        match.team1Squard.forEach((team) => {
          users[team].score = users[team].score + prize;
          users[team].lose = users[team].lose + 1;
        });
        match.team2Squard.forEach((team) => {
          users[team].score = users[team].score + prize;
          users[team].lose = users[team].lose + 1;
        });
        notPlayedSquard.forEach((team) => {
          users[team._id].notPlayed = users[team._id].notPlayed + 1;
        });
      }
    }
  });

  const newRows = Object.keys(users || []).map((user, index) => {
    return createData(
      index,
      getName(user),
      users[user].win,
      users[user].lose,
      users[user].notPlayed,
      users[user].score
    );
  });

  const rows = [
    ...newRows
      .sort((a, b) => (a.score > b.score ? 1 : b.score > a.score ? -1 : 0))
      .reverse(),
  ];

  const columns: any[] = [
    {
      field: "name",
      headerName: "Name",
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <div className={classes.avatar}>
          <Avatar
            className="avatar"
            src={`https://api.multiavatar.com/${params.row.name}.svg`}
          />
          <span>{params.row.name}</span>
        </div>
      ),
      width: 150,
    },
    {
      field: "win",
      headerName: "WIN",
      headerAlign: "center",
      sortable: true,
      width: 100,
      align: "center",
    },
    {
      field: "lose",
      headerName: "LOSE",
      sortable: true,
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "notPlayed",
      headerName: "NOTPLAYED",
      type: "number",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "score",
      headerAlign: "center",
      align: "center",
      headerName: "SCORE",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 120,
    },
  ];

  return (
    <div className="points-table">
      <Button
        variant="outlined"
        style={{ marginTop: 20 }}
        color="primary"
        onClick={() => setOpen(true)}
      >
        Points Table
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
            <Typography variant="h6">Result table</Typography>
          </Toolbar>
        </AppBar>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            hideFooterPagination
            hideFooterRowCount
            disableExtendRowFullWidth
            disableSelectionOnClick
            autoHeight
            hideFooter
          />
        </div>
      </Dialog>
    </div>
  );
}
