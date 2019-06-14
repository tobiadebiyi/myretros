import * as React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { RouteComponentProps } from "react-router";
import { Retro } from "../state";

import TopBar from "./TopBar";
import { ViewType } from "./ViewType";
import Detail from "./Detail";
import Master from "./Master";

const styles = theme => createStyles({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "hidden",
  },
});

interface RetroRouteParams {
  retroReference: string;
}

export interface MasterDetailViewProps extends RouteComponentProps<RetroRouteParams>, WithStyles<typeof styles> {
  retro: Retro;
  joinRetro: (retroId: string) => void;
}

interface MasterDetailViewState {
  open: boolean;
  view: ViewType;
}

class MasterDetailView extends React.Component<MasterDetailViewProps, MasterDetailViewState> {
  constructor(props: MasterDetailViewProps) {
    super(props);

    this.state = {
      open: true,
      view: ViewType.Tab,
    };

    if (this.props.match.params.retroReference)
      this.props.joinRetro(this.props.match.params.retroReference);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  componentWillReceiveProps(newProps: MasterDetailViewProps) {
    if (this.props.match.params.retroReference !== newProps.match.params.retroReference) {
      this.props.joinRetro(newProps.match.params.retroReference);
    }
  }

  handleAlignment = (__, view) => this.setState({ view });

  render() {
    const { classes, retro, match } = this.props;
    const { view, open } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <TopBar retro={retro} handleDrawerOpen={this.handleDrawerOpen} />
          <Master open={open} handleDrawerClose={this.handleDrawerClose} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Detail match={match} retro={retro} handleAlignment={this.handleAlignment} view={view} />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MasterDetailView);