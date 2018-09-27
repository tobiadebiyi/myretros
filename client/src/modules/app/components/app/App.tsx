import * as React from "react";
import "typeface-roboto/index.css";
import { CssBaseline } from "@material-ui/core";
import Header from "../Header";
import { MyRetrosContainer } from "../../../retro";

export interface AppProps {
  isLoading: boolean;
}

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <Header />
        <MyRetrosContainer isLoading={true} />
      </div>
    );
  }
}

export default App;
