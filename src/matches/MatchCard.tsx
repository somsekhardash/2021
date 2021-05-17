import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { getAbbr } from "src/utils/constants";
import { useDispatch } from "react-redux";
import ipl2021 from "./../images/ipl2021.jpg";

import {
  onDeleteMatch,
  onSelectMatch,
  voteMatch,
} from "src/tournaments/actions";
import { allMatches } from "src/common/allMatches";
import moment from "moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateSelector } from "src/reducers";
import HideMe from "src/common/useFooter";
import { Avatar, Fab } from "@material-ui/core";

import { socket } from "src/utils/shocket";
import { EditMatch } from "./editMatch";
import Loader from "src/common/Loader";
import LoaderSuccess from "src/utils/LoaderSuccess";
import LoaderFail from "src/utils/LoaderFail";

export const MatchCard = ({ match, selectedTournament, match_id }: any) => {
  const { isAdmin, data } = useStateSelector(({ authState }) => authState);
  const { userVoteLoader, userVoteSuccess, userVoteError, selectedMatch } =
    useStateSelector(({ TournamentState }) => TournamentState);
  const dispatch = useDispatch();
  const { imageMap } = allMatches();
  const [selectedTeam, setSelectedTeam] = useState(null as any);
  const onSelectTeam = (e) => {
    const local = { ...match };

    if (e.currentTarget.value == "team1Squard") {
      local.team1Squard = !local.team1Squard
        .map((player) => player._id)
        .includes(data._id)
        ? [...local.team1Squard, data]
        : [...local.team1Squard];
      local.team2Squard = [
        ...local.team2Squard.filter((player) => player._id !== data._id),
      ];
    } else {
      local.team2Squard = !local.team2Squard
        .map((player) => player._id)
        .includes(data._id)
        ? [...local.team2Squard, data]
        : [...local.team2Squard];
      local.team1Squard = [
        ...local.team1Squard.filter((player) => player._id !== data._id),
      ];
    }
    dispatch(onSelectMatch({ selectedMatch: local }));
    setSelectedTeam(e.currentTarget.value);
  };
  const checkWinner = (winner, team) => {
    if (winner) return winner === team ? "winner" : "loser";
    return null;
  };

  return (
    <div className="MatchCard" id={match._id}>
      <Card className="container">
        <div className="action-buttons">
          <HideMe visible={isAdmin}>
            <CardActions>
              <EditMatch
                selectedTournament={selectedTournament}
                selectedMatch={match}
                title="Edit Match"
              />
            </CardActions>
          </HideMe>
          <HideMe visible={selectedTeam}>
            <CardActions>
              <HideMe visible={!match.isStarted}>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="like"
                  onClick={() => {
                    socket.emit("vote", {
                      data: `voted for ${
                        selectedTeam == "team2Squard"
                          ? match.team2
                          : match.team1
                      } in ${match.team1} vs ${match.team2}`,
                      user: data.userName,
                      type: "vote",
                    });
                    dispatch(
                      voteMatch({
                        ...match,
                        selectedTeam: selectedTeam,
                        userdata: data,
                      })
                    );
                    setSelectedTeam(null);
                  }}
                >
                  <FavoriteIcon />
                </Fab>
              </HideMe>
            </CardActions>
          </HideMe>
          <HideMe visible={isAdmin}>
            <CardActions>
              <Fab
                size="small"
                color="secondary"
                aria-label="like"
                onClick={() => {
                  alert("are you sure ? ");
                  dispatch(onDeleteMatch({ selectedMatch: match }));
                }}
              >
                <DeleteIcon />
              </Fab>
            </CardActions>
          </HideMe>
        </div>
        <CardActionArea className={match.isStarted ? "match-started" : ""}>
          <CardMedia
            className="media"
            title="Contemplative Reptile"
            image={!getAbbr(match.team2) ? ipl2021 : null}
          >
            <label
              className={`leftC ${checkWinner(match.winner, match.team1)} ${
                selectedTeam == "team1Squard" ? "selected-team" : ""
              }`}
            >
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
                      alt={player.userName}
                      className="avatar"
                      key={i}
                      src={`https://api.multiavatar.com/${player.userName}.svg`}
                    />
                  );
                })}
              </div>
              <img
                src={imageMap[getAbbr(match.team1).toLowerCase()] || ipl2021}
                alt={match.team1}
              />
              <button
                className={`${getAbbr(match.team1).toLowerCase()}-color`}
              ></button>
            </label>

            <label
              className={`rightC ${checkWinner(match.winner, match.team2)} ${
                selectedTeam == "team2Squard" ? "selected-team" : ""
              }`}
            >
              {/* {match.winner && checkWinner(match.winner, match.team2)} */}
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
                      alt={player.userName}
                      className="avatar"
                      key={i}
                      src={`https://api.multiavatar.com/${player.userName}.svg`}
                    />
                  );
                })}
              </div>
              <img
                src={imageMap[getAbbr(match.team2).toLowerCase()] || ipl2021}
                alt={match.team2}
              />
              <button
                className={`${getAbbr(match.team2).toLowerCase()}-color`}
              ></button>
            </label>
          </CardMedia>
          <div className="squard-parent">
            <div className="squard">
              {selectedTournament.users.map((player, i) => {
                return !match.team1Squard
                  .map((player) => player._id)
                  .includes(player._id) &&
                  !match.team2Squard
                    .map((player) => player._id)
                    .includes(player._id) ? (
                  <Avatar
                    alt={player.UserName}
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
            <Typography variant="body2" color="textSecondary" component="p">
              <span>
                {moment(match.time, "yyyy-MM-DDThh:mm").format(
                  "MMMM Do YYYY, h:mm a"
                )}
              </span>

              <span> - {match.venue}</span>
            </Typography>
          </CardContent>
        </CardActionArea>

        <HideMe
          visible={selectedMatch?._id == match._id && userVoteLoader}
          duration={0}
        >
          <Loader />
        </HideMe>
        <HideMe
          visible={selectedMatch?._id == match._id && userVoteSuccess}
          duration={2000}
        >
          <LoaderSuccess message={userVoteSuccess} />
        </HideMe>
        <HideMe
          visible={selectedMatch?._id == match._id && userVoteError}
          duration={0}
        >
          <LoaderFail message={userVoteError} />
        </HideMe>
      </Card>
    </div>
  );
};
