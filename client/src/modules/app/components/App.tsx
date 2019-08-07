import * as React from "react";
import "typeface-roboto/index.css";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import SnackBar from "./SnackBar";
import { Switch, Route } from "react-router";
import MasterDetail from "src/modules/views/masterDetail";

export class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <Switch>
          <Route exact={true} path="/" component={MasterDetail} />
          <Route path="/retros/:retroReference?" component={MasterDetail} />
        </Switch>
        <SnackBar />
      </div>
    );
  }
}
