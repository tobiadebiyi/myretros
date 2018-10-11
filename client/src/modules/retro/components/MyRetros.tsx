import * as React from "react";
import { Switch, Route } from "react-router";
import { RetroListContainer } from "../../retroList";
import { RetroTabsContainer } from "../../retroTabs";
import { LinearProgress } from "@material-ui/core";
import DetailedView from "../../retroTabs/components/DetailedView";

export interface MyRetrosProps {
  isLoading: boolean;
}

export const MyRetros = (props: MyRetrosProps) => {
  return (
    <div>
      {props.isLoading && <LinearProgress color="secondary" />}
      <Switch>
        <Route exact={true} path="/" component={RetroListContainer} />
        <Route path="/retro/:retroId" component={RetroTabsContainer} />
        <Route path="/detailed/:retroId" component={DetailedView} />
      </Switch>
    </div>
  );
};