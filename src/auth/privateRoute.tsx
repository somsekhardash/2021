import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, isLoggedIn, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
