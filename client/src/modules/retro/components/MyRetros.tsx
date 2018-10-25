import * as React from "react";
import { Switch, Route } from "react-router";
import { LinearProgress } from "@material-ui/core";
import { DetailedViewContainer } from "../../retroTabs";

export interface MyRetrosProps {
  isLoading: boolean;
}

export const MyRetros = (props: MyRetrosProps) => {
  return (
    <div>
      {props.isLoading && <LinearProgress color="secondary" />}
      <Switch>
        <Route exact={true} path="/" component={DetailedViewContainer} />
        <Route path="/retros/:retroReference?" component={DetailedViewContainer} />
      </Switch>
    </div>
  );
};