import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { basicLogout } from "Src/auth/actions";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
// import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { useStateSelector } from "Src/reducers";
import "./header.scss";
import { Menu, MenuItem, SwipeableDrawer } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export const Header = () => {
  const { data: authData, isLoggedIn } = useStateSelector(
    ({ authState }) => authState
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawer, toggleDrawer] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();
  let history = useHistory();
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={0} className="appBar">
      <Toolbar className="toolbar">
        <div
          className="left"
          onClick={() => {
            // toggleDrawer(!drawer);
            // history.push("/profile");
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

        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={() => toggleDrawer(!drawer)}
          onOpen={() => toggleDrawer(drawer)}
        >
          <Avatar
            className="avatar"
            alt={authData?.userName}
            src={`https://api.multiavatar.com/${authData?.userName}.svg`}
          />
        </SwipeableDrawer>

        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <Link to={`/profile`} className="btn btn-primary">
              Edit Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={() => dispatch(basicLogout(authData))}>
            Logout
          </MenuItem>
        </Menu>
        {/* <Button
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
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};
