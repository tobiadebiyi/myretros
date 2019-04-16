import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { startSignalR } from "./store/signalR";
import { App } from "./modules/app/";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

startSignalR(store, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={createBrowserHistory()} >
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </Router>
    </Provider>,
    document.getElementById("root") as HTMLElement
  );
});

registerServiceWorker();
