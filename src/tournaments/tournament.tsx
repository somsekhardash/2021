import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { deleteTournament, onSelectTournament } from "./actions";
import { Match, Tournament } from "./../app-types";
import { MatchCards } from "Src/matches/matches";
import { AddUser } from "Src/users/addUser";
import ipl2021 from "./../images/ipl2021.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 34,
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
});

// const getUserName = (users: [any], user_id: string) => {
//   const user = users.find((user) => user._id === user_id);
//   return user?.userName;
// };

export const TournamentCard = (props: any) => {
  const { tournament, users, isAdmin, userArray } = props;
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          dispatch(onSelectTournament({ selectedTournament: tournament }));
          history.push(`/matches/${tournament._id}`);
        }}
      >
        <CardMedia
          className={classes.media}
          image={ipl2021}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom align="center" variant="h5" component="h2">
            {tournament.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <AvatarGroup max={4}>
              {users.map((user: any, index: number) => {
                return (
                  <Avatar
                    key={index}
                    alt="Agnes Walker"
                    src={`https://api.multiavatar.com/${user.userName}.svg`}
                  >
                    {user.userName}
                  </Avatar>
                );
              })}
            </AvatarGroup>
          </Typography>
        </CardContent>
      </CardActionArea>
      {isAdmin && (
        <CardActions>
          {/* <Button size="small" color="primary"> */}
          <AddUser users={userArray} tournament={tournament} />
          {/* </Button> */}
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deleteTournament({ tournamentId: tournament._id }));
              // location.reload();
            }}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
