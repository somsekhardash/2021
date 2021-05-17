import React, { Suspense } from "react";
import { Tournaments } from "./../tournaments/tournaments";
// import { Login } from "./../auth/login";
import { Signup } from "./../auth/signup";
// import { PrivateRoute } from "./../auth/privateRoute";
import { useStateSelector } from "src/reducers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { MatchCards } from "src/matches/MatchCards";
// import { ProfilePage } from "src/common/ProfilePage";
import TournamentResult from "src/common/TournamentResult";
// import Notifications from "src/common/Notifications";
import Loader from "src/common/Loader";
import { ErrorBoundary } from "src/common/ErrorBoundary";

const Login = React.lazy(() =>
  import("src/auth/login").then(({ Login }) => ({
    default: Login,
  }))
);
const MatchCards = React.lazy(() =>
  import("src/matches/MatchCards").then(({ MatchCards }) => ({
    default: MatchCards,
  }))
);
const ProfilePage = React.lazy(() =>
  import("src/common/ProfilePage").then(({ ProfilePage }) => ({
    default: ProfilePage,
  }))
);
// const TournamentResult = React.lazy(
//   () => import("src/common/tournamentResult")
// );
const Notifications = React.lazy(() => import("src/common/Notifications"));

export const Routes = ({ cookieData }) => {
  const { isLoggedIn } = useStateSelector(({ authState }) => authState);

  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              <Tournaments />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/tournament-result/:tournamentID">
              <TournamentResult />
            </Route>
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/matches/:tournamentID">
              <MatchCards />
            </Route>
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};
