import React, { useEffect } from "react";
import { cookieManager } from "./../utils/cookieManager";
import { useDispatch } from "react-redux";
import { loginActions } from "../auth/actions";
import { Routes } from "./routes";
import { useStateSelector } from "Src/reducers";

export const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useStateSelector(({ authState }) => authState);
  const cookieData = cookieManager.get("user-data");
  useEffect(() => {
    !isLoggedIn && cookieData && dispatch(loginActions.success(cookieData));
  }, []);

  return <Routes cookieData={cookieData} />;
};
