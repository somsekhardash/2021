import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getAbbr } from "Src/utils/constants";
import { EditMatch } from "./editMatch";
import { useDispatch } from "react-redux";
import ipl2021 from "./../images/ipl2021.jpg";
import winnerImage from "./../images/pubg.jpg";

import {
  onEditMatch,
  onSelectMatch,
  updateMatch,
} from "Src/tournaments/actions";
import { allMatches } from "Src/common/allMatches";
import moment from "moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateSelector } from "Src/reducers";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  debounce,
  Fab,
  makeStyles,
} from "@material-ui/core";

export const MatchCard = ({ match, selectedTournament, match_id }: any) => {
  const { isAdmin, data } = useStateSelector(({ authState }) => authState);
  const { matchLoader } = useStateSelector(
    ({ TournamentState }) => TournamentState
  );
  const dispatch = useDispatch();
  const { imageMap } = allMatches();
  const [selectedTeam, setSelectedTeam] = useState(null as any);

  const useStyles = makeStyles({
    backdrop: {
      zIndex: 1,
      color: "#fff",
    },
  });
  const classes = useStyles();
  const onSelectTeam = (e) => {
    const local = { ...match };
    if (e.currentTarget.value == "team1Squard") {
      local.team1Squard = !local.team1Squard.includes(data._id)
        ? [...local.team1Squard, data._id]
        : [...local.team1Squard];
      local.team2Squard = [
        ...local.team2Squard.filter((user) => user !== data._id),
      ];
    } else {
      local.team2Squard = !local.team2Squard.includes(data._id)
        ? [...local.team2Squard, data._id]
        : [...local.team2Squard];
      local.team1Squard = [
        ...local.team1Squard.filter((user) => user !== data._id),
      ];
    }
    dispatch(onSelectMatch({ selectedMatch: local }));
    setSelectedTeam(e.currentTarget.value);
  };

  const getUserName = (id: string) => {
    const user = selectedTournament.users.find((user) => user._id === id);
    return user?.userName;
  };

  const checkWinner = (winner, team) => {
    return winner === team ? (
      <span className="winner"></span>
    ) : (
      <span className="loser"></span>
    );
  };

  return (
    <div className="MatchCard">
      <Card className="container">
        <CardActionArea className={match.isStarted ? "match-started" : ""}>
          <Backdrop open={matchLoader} className={classes.backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <CardMedia
            className="media"
            title="Contemplative Reptile"
            image={!getAbbr(match.team2) ? ipl2021 : null}
          >
            <label className="leftC">
              {match.winner && checkWinner(match.winner, match.team1)}

              <input
                type="radio"
                name="match"
                value="team1Squard"
                onChange={(e: any) => {
                  onSelectTeam(e);
                }}
              />
              <div className="squard">
                {match.team1Squard.map((player, i) => {
                  return (
                    <Avatar
                      alt={getUserName(player)}
                      className="avatar"
                      key={i}
                      src={`https://api.multiavatar.com/${getUserName(
                        player
                      )}.svg`}
                    />
                  );
                })}
              </div>
              <img
                src={imageMap[getAbbr(match.team1).toLowerCase()] || ipl2021}
                alt={match.team1}
              />
            </label>

            <label className="leftC">
              {match.winner && checkWinner(match.winner, match.team2)}
              <input
                type="radio"
                name="match"
                value="team2Squard"
                onChange={(e: any) => {
                  onSelectTeam(e);
                }}
              />
              <div className="squard">
                {match.team2Squard.map((player, i) => {
                  return (
                    <Avatar
                      alt={getUserName(player)}
                      className="avatar"
                      key={i}
                      src={`https://api.multiavatar.com/${getUserName(
                        player
                      )}.svg`}
                    />
                  );
                })}
              </div>
              <img
                src={imageMap[getAbbr(match.team2).toLowerCase()] || ipl2021}
                alt={match.team2}
              />
            </label>
          </CardMedia>
          <div className="squard-parent">
            <div className="squard">
              {selectedTournament.users.map((player, i) => {
                return !match.team1Squard.includes(player._id) &&
                  !match.team2Squard.includes(player._id) ? (
                  <Avatar
                    alt={getUserName(player._id)}
                    className="avatar"
                    key={i}
                    src={`https://api.multiavatar.com/${player.userName}.svg`}
                  />
                ) : null;
              })}
            </div>
          </div>
          <CardContent>
            {match.winner && <div className="match-over"></div>}
            <Typography gutterBottom variant="h5" component="h2">
              {getAbbr(match.team2)
                ? `${getAbbr(match.team1)} vs ${getAbbr(match.team2)}`
                : match.team1}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <span>
                {getAbbr(match.team2)
                  ? `${match.team1} vs ${match.team2}`
                  : match.team1}
              </span>
              <br></br>
              <span>
                {moment(match.time, "yyyy-MM-DDThh:mm").format(
                  "MMMM Do YYYY, h:mm a"
                )}
              </span>{" "}
              at
              <span> {match.venue}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
        {(!!selectedTeam || isAdmin) && (
          <CardActions>
            {!!selectedTeam && !match.isStarted && (
              <Fab
                size="small"
                color="secondary"
                aria-label="like"
                onClick={() => {
                  dispatch(
                    updateMatch({
                      ...match,
                    })
                  );
                }}
              >
                <FavoriteIcon />
              </Fab>
            )}
            {isAdmin && (
              <Fab
                size="small"
                color="secondary"
                aria-label="like"
                onClick={() => {
                  dispatch(onEditMatch({ selectedMatch: match }));
                }}
              >
                <EditIcon />
              </Fab>
            )}
            {isAdmin && (
              <Fab
                size="small"
                color="secondary"
                aria-label="like"
                onClick={() => {
                  console.log("TO DO");
                }}
              >
                <DeleteIcon />
              </Fab>
            )}
          </CardActions>
        )}
      </Card>
    </div>
  );
};
