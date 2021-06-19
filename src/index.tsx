import React, { ReactElement, useEffect } from "react";
import ReactDOM from "react-dom";
import { App } from "./app/app";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "src/reducers";
import { createStore, applyMiddleware } from "redux";
import { crashReporter, logger } from "./utils/middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import "./index.scss";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger, crashReporter))
);

const Container = (): ReactElement => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
ReactDOM.render(<Container />, document.getElementById("app"));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
