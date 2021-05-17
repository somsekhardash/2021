import React, { useEffect } from "react";
import { cookieManager } from "./../utils/cookieManager";
import { useDispatch } from "react-redux";
import { loginActions } from "../auth/actions";
import { Routes } from "./routes";
import { useStateSelector } from "src/reducers";
import { Login } from "src/auth/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useStateSelector(({ authState }) => authState);
  const cookieData = cookieManager.get("user-data");

  useEffect(() => {
    !isLoggedIn && cookieData && dispatch(loginActions.success(cookieData));
  }, []);

  if (isLoggedIn || cookieData) {
    return (
      <Router>
        <Routes cookieData={cookieData} />
      </Router>
    );
  } else {
    return <Login />;
  }
};
