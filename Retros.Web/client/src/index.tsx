import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { startSignalR } from "./store/signalR";

startSignalR(store, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={createBrowserHistory()} >
        <App />
      </Router>
    </Provider>,
    document.getElementById("root") as HTMLElement
  );
});

registerServiceWorker();
