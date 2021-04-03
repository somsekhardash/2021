import React from "react";
import { useDispatch } from "react-redux";
import { basicLogout } from "Src/auth/actions";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { useStateSelector } from "Src/reducers";
import "./header.scss";

export const Header = () => {
  const { data: authData, isLoggedIn } = useStateSelector(
    ({ authState }) => authState
  );
  const dispatch = useDispatch();
  let history = useHistory();
  return (
    <div>
      <AppBar position="static" elevation={0} className="appBar">
        <Toolbar className="toolbar">
          <div
            className="left"
            onClick={() => {
              history.push("/");
            }}
          >
            <Avatar
              className="avatar"
              src={`https://api.multiavatar.com/${authData?.userName}.svg`}
            />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className="toolbarTitle"
            >
              {authData?.userName}
            </Typography>
          </div>
          <Button
            href="#"
            className="link"
            style={{ color: "white" }}
            startIcon={<ExitToAppIcon />}
            onClick={() => {
              dispatch(basicLogout(authData));
              // history.push("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
