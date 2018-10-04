import * as React from "react";
import "typeface-roboto/index.css";
import { CssBaseline } from "@material-ui/core";
import Header from "../Header";
import { MyRetrosContainer } from "../../../retro";

class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <Header />
        <MyRetrosContainer />
      </div>
    );
  }
}

export default App;
