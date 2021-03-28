import React, { ReactElement, useEffect } from "react";
import ReactDOM from "react-dom";
import { App } from "./app/app";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "Src/reducers";
import { createStore, applyMiddleware } from "redux";
import { crashReporter, logger } from "./utils/middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.scss";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger, crashReporter))
);

const Container = (): ReactElement => {
  return (
    <Provider store={store}>
      <Router>
        <Route component={App} />
      </Router>
    </Provider>
  );
};
ReactDOM.render(<Container />, document.getElementById("app"));
