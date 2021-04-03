import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { EditUser } from "./editUser";
import { deleteUser } from "Src/tournaments/actions";
import EditIcon from "@material-ui/icons/Edit";
import { Avatar } from "@material-ui/core";
import { useStateSelector } from "Src/reducers";
import StarsIcon from "@material-ui/icons/Stars";
import withLoading from "Src/utils/loader";

const useStyles = makeStyles({
  user: {
    display: "flex",
    margin: "15px 15px 15px 0",
  },
  root: {
    display: "flex",
    width: 300,
    justifyContent: "space-around",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 125,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  large: {
    height: 100,
    width: 100,
  },
});

function DeleteIcon(props) {
  return (
    <IconButton
      aria-label="delete"
      onClick={() => {
        props.dispatch(
          deleteUser({
            userId: props.user._id,
          })
        );
      }}
      disabled={process.env.ADMIN_ID == props.user.mobileNumber}
    >
      <DeleteForeverIcon />
    </IconButton>
  );
}

const DeleteIconWithLoading = withLoading(DeleteIcon);

export const UserCard = ({ user }: any) => {
  const classes = useStyles();
  const { isAdmin } = useStateSelector(({ authState }) => authState);
  const { userLoader } = useStateSelector(
    ({ TournamentState }) => TournamentState
  );
  const dispatch = useDispatch();
  return (
    <div className={classes.user}>
      <Card className={classes.root}>
        <div className={classes.details}>
          {process.env.ADMIN_ID == user.mobileNumber ? (
            <StarsIcon></StarsIcon>
          ) : null}
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {[user.userName]}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user.mobileNumber}
            </Typography>
          </CardContent>
          {isAdmin && (
            <div className={classes.controls}>
              <EditUser user={user} />
              <DeleteIconWithLoading
                isLoading={userLoader}
                dispatch={dispatch}
                user={user}
              />
            </div>
          )}
        </div>
        <CardMedia
          className={classes.cover}
          image={`https://api.multiavatar.com/${user.userName}.svg`}
          title={user.userName}
        >
          {/* <Avatar
            alt="Remy Sharp"
            src={`https://api.multiavatar.com/${user.userName}`}
            className={classes.large}
          ></Avatar> */}
        </CardMedia>
      </Card>
    </div>
  );
};
