import * as React from "react";
import { Switch, Route } from "react-router";
import { LinearProgress } from "@material-ui/core";
import { MasterDetailViewContainer } from "../../retroTabs";

export interface MyRetrosProps {
  isLoading: boolean;
}

export const MyRetros = (props: MyRetrosProps) => {
  return (
    <div>
      {props.isLoading && <LinearProgress color="secondary" />}
      <Switch>
        <Route exact={true} path="/" component={MasterDetailViewContainer} />
        <Route path="/retros/:retroReference?" component={MasterDetailViewContainer} />
      </Switch>
    </div>
  );
};