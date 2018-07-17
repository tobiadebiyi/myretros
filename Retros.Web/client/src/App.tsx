import * as React from "react";
import "typeface-roboto/index.css";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { RetroListContainer } from "./modules/retroList";
import { CssBaseline } from "material-ui";
import Header from "./Header";
import { Route, Switch } from "react-router";
import { RetroContainer } from "./modules/retro";

@DragDropContext(HTML5Backend)
class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <Header />
        <div>
        <Switch>
          <Route exact={true} path="/" component={RetroListContainer} />
          <Route path="/retro/:retroId" component={RetroContainer} />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
