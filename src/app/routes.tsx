import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Tournaments } from "./../tournaments/tournaments";
import { Login } from "./../auth/login";
import { Signup } from "./../auth/signup";
import { MatchCards } from "src/matches/MatchCards";
import { ProfilePage } from "src/common/ProfilePage";
import TournamentResult from "src/common/TournamentResult";
import Notifications from "src/common/Notifications";
import Loader from "src/common/Loader";
import { ErrorBoundary } from "src/common/ErrorBoundary";
import { PrivateRoute } from "src/auth/privateRoute";

export const Routes = ({ isLoggedIn }) => {
  return (
    <Router>
      <ErrorBoundary>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <PrivateRoute exact path="/" isLoggedIn={isLoggedIn}>
            <Tournaments />
          </PrivateRoute>
          <PrivateRoute exact path="/profile" isLoggedIn={isLoggedIn}>
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/tournament-result/:tournamentID"
            isLoggedIn={isLoggedIn}
          >
            <TournamentResult />
          </PrivateRoute>
          <PrivateRoute exact path="/notifications" isLoggedIn={isLoggedIn}>
            <Notifications />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/matches/:tournamentID"
            isLoggedIn={isLoggedIn}
          >
            <MatchCards />
          </PrivateRoute>
        </Switch>
      </ErrorBoundary>
    </Router>
  );
};
