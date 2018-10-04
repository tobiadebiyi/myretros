import * as React from "react";
import "typeface-roboto/index.css";
import { CssBaseline } from "@material-ui/core";
import { MyRetrosContainer } from "../../retro";

export class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <MyRetrosContainer />
      </div>
    );
  }
}
