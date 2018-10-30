import * as React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import * as classNames from "classnames";
import { RetroListContainer } from "../../retroList";
import { RetroTabsContainer } from "../container";
import { RouteComponentProps } from "react-router";
import { Retro } from "../state";
import SummaryView from "./SummaryView";

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
});

<<<<<<< HEAD
<<<<<<< HEAD:client/src/modules/retroTabs/components/DetailedView.tsx
export interface DetailedViewProps extends RouteComponentProps<{ retroReference: string }>, WithStyles<typeof styles> {
=======
export interface MasterDetailViewProps extends RouteComponentProps<{ retroId: string }>, WithStyles<typeof styles> {
>>>>>>> create initial summary view:client/src/modules/retroTabs/views/MasterDetailView.tsx
=======
type RetroViewType = "Tab" | "Summary";

interface RetroRouteParams {
  retroId: string;
}

export interface MasterDetailViewProps extends RouteComponentProps<RetroRouteParams>, WithStyles<typeof styles> {
>>>>>>> Complete summary view.
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
      view: "Summary",
    };

    if (this.props.match.params.retroId)
      this.props.joinRetro(this.props.match.params.retroId);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  componentWillReceiveProps(newProps: MasterDetailViewProps) {
    if (this.props.match.params.retroId !== newProps.match.params.retroId) {
      this.props.joinRetro(newProps.match.params.retroId);
    }
  }

  render() {
    const { classes, retro } = this.props;
    const showTabView = this.props.retro && this.state.view === "Tab";
    const showSummaryView = this.props.retro && this.state.view === "Summary";

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
              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
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
            <Typography component="div" className={classes.chartContainer}>
<<<<<<< HEAD
<<<<<<< HEAD:client/src/modules/retroTabs/components/DetailedView.tsx
              {this.props.match.params.retroReference && < RetroTabsContainer match={this.props.match} />}
=======
              {this.props.retro && this.state.view === "Tab" && < RetroTabsContainer match={this.props.match} />}
              {this.props.retro && this.state.view === "Summary" && <Summary retro={this.props.retro} />}
>>>>>>> create initial summary view:client/src/modules/retroTabs/views/MasterDetailView.tsx
=======
              {showTabView && < RetroTabsContainer match={this.props.match} />}
              {showSummaryView && <SummaryView retro={this.props.retro} />}
>>>>>>> Complete summary view.
            </Typography>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MasterDetailView);