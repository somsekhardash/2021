import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, ValueGetterParams } from "@material-ui/data-grid";
import { Avatar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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
  lost: number,
  notPlayed: number,
  score: number,
  score1: number
) {
  return { id, name, win, lost, notPlayed, score, score1 };
}

export default function BasicTable({ selectedTournament }) {
  const classes = useStyles();
  const [base, setBase] = React.useState(10);
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
    newUser.score1 = 0;
    newUser.chart = [];
    matches.forEach((match, index) => {
      const { winners, notPlayed, point } = getTeamDetails(match);
      if (notPlayed.map((player) => player._id).includes(user._id)) {
        newUser.notPlayed = newUser.notPlayed + 1;
      } else if (winners.map((player) => player._id).includes(user._id)) {
        newUser.win = newUser.win + 1;
        newUser.score = newUser.score + point;
      } else newUser.lost = newUser.lost + 1;
      newUser.chart.push(newUser.score);
    });
    newUser.score1 = newUser.score - base * matches.length;
    return newUser;
  };

  const usersObj = users.reduce((accumulator, currentValue) => {
    accumulator[currentValue._id] = getMatchDetails(currentValue);
    return accumulator;
  }, {});
  const newRows = Object.keys(usersObj || []).map((user, index) => {
    return createData(
      usersObj[user]._id,
      usersObj[user].userName,
      usersObj[user].win,
      usersObj[user].lost,
      usersObj[user].notPlayed,
      usersObj[user].score,
      usersObj[user].score1
    );
  });

  let rows: any = [];
  let columns: any = [];

  rows = [
    ...newRows
      .sort((a, b) => (a.score > b.score ? 1 : b.score > a.score ? -1 : 0))
      .reverse(),
  ];

  columns = [
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
    },
    {
      field: "score1",
      headerAlign: "center",
      align: "center",
      headerName: "Result",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      renderCell: (params: any) => (
        <div className={params.value > 0 ? "green" : "red"}>
          {params.value > 0 ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          {params.value}
        </div>
      ),
    },
    {
      field: "score",
      headerAlign: "center",
      align: "center",
      headerName: "SCORE",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
    },
    {
      field: "win",
      headerName: "WIN",
      headerAlign: "center",
      sortable: true,
      align: "center",
    },
    {
      field: "lost",
      headerName: "lost",
      sortable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "notPlayed",
      headerName: "NOTPLAYED",
      type: "number",
      sortable: true,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <div className="points-table">
      <TextField
        id="points-number"
        label="points"
        type="number"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        value={base}
        onChange={(event) => {
          setBase(parseInt(event.target.value));
        }}
      />
      <DataGrid
        rows={rows}
        className="match-data-grid"
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
  );
}
