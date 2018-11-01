import * as React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListTwoTone from "@material-ui/icons/ListTwoTone";
import Tab from "@material-ui/icons/Tab";

import * as classNames from "classnames";
import { RetroListContainer } from "../../retroList";
import { RetroTabsContainer } from "../container";
import { RouteComponentProps } from "react-router";
import { Retro } from "../state";
import SummaryView from "./SummaryView";
import { Tooltip } from "@material-ui/core";

const drawerWidth = 240;

const styles = theme => createStyles({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto",
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  viewToggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
  centeredContent: {
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

enum RetroViewType {
  "Tab", "Summary"
}
interface RetroRouteParams {
  retroReference: string;
}

export interface MasterDetailViewProps extends RouteComponentProps<RetroRouteParams>, WithStyles<typeof styles> {
  retro: Retro;
  joinRetro: (retroId: string) => void;
}

interface MasterDetailViewState {
  open: boolean;
  view: RetroViewType;
}

class MasterDetailView extends React.Component<MasterDetailViewProps, MasterDetailViewState> {
  constructor(props: MasterDetailViewProps) {
    super(props);

    this.state = {
      open: true,
      view: RetroViewType.Tab,
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

  renderMain() {
    const { classes, retro } = this.props;
    const showTabView = this.props.retro && this.state.view === RetroViewType.Tab;
    const showSummaryView = this.props.retro && this.state.view === RetroViewType.Summary;

    if (!retro) {
      return (
        <div className={classes.centeredContent}>
          <Typography variant="overline">Please create or join a retro</Typography>
        </div>
      );
    }

    return (
      <div>
        <div className={classes.viewToggleContainer}>
          <ToggleButtonGroup value={this.state.view} exclusive={true} onChange={this.handleAlignment}>
            <ToggleButton value={RetroViewType.Tab}>
              <Tooltip title={"Tab view"}>
                <Tab />
              </Tooltip>
            </ToggleButton>

            <ToggleButton value={RetroViewType.Summary}>
              <Tooltip title={"Summary view"}>
                <ListTwoTone />
              </Tooltip>
            </ToggleButton>

          </ToggleButtonGroup>
        </div>
        <div className={classes.chartContainer}>
          {showTabView && < RetroTabsContainer match={this.props.match} />}
          {showSummaryView && <SummaryView retro={this.props.retro} />}
        </div>
      </div>
    );
  }

  render() {
    const { classes, retro } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                noWrap={true}
                className={classes.title}
              >
                MyRetros
              </Typography>
              <Typography
                variant="subtitle1"
                color="inherit"
                style={{ textAlign: "center" }}
              >
                {retro && retro.name}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <RetroListContainer {...this.props} />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {this.renderMain()}
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MasterDetailView);