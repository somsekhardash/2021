import React from "react";
import { Tournaments } from "./../tournaments/tournaments";
import { Login } from "./../auth/login";
import { Signup } from "./../auth/signup";
import { PrivateRoute } from "./../auth/privateRoute";
import { useStateSelector } from "Src/reducers";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { MatchCards } from "Src/matches/matches";

export const Routes = () => {
  const { isLoggedIn } = useStateSelector(({ authState }) => authState);

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        {isLoggedIn && (
          <PrivateRoute exact isLoggedIn={isLoggedIn} path="/">
            <Tournaments />
          </PrivateRoute>
        )}
        {isLoggedIn && (
          <PrivateRoute
            exact
            isLoggedIn={isLoggedIn}
            path="/matches/:tournamentID"
          >
            <MatchCards />
          </PrivateRoute>
        )}
        <Route path="*" component={Login} />
      </Switch>
    </Router>
  );
};
