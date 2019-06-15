import * as React from "react";
import "typeface-roboto/index.css";
import { MyRetrosContainer } from "../../retro";
import CssBaseline from "@material-ui/core/CssBaseline";
import SnackBar from "./SnackBar";

export class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <MyRetrosContainer />
        <SnackBar />
      </div>
    );
  }
}
