import React, { useEffect } from "react";
import { cookieManager } from "./../utils/cookieManager";
import { useDispatch } from "react-redux";
import { loginActions } from "../auth/actions";
import { Routes } from "./routes";
import { useStateSelector } from "src/reducers";
import { Login } from "src/auth/login";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Signup } from "src/auth/signup";

export const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useStateSelector(({ authState }) => authState);
  const cookieData = cookieManager.get("user-data");

  useEffect(() => {
    !isLoggedIn && cookieData && dispatch(loginActions.success(cookieData));
  }, []);

  return (
    <Router>
      <Routes isLoggedIn={isLoggedIn || cookieData} />
    </Router>
  );
};
