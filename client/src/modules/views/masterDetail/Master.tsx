import * as React from "react";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import * as classNames from "classnames";

import { Retros } from "../../retros";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

const drawerWidth = 240;

const styles = theme => createStyles({
  root: { position: "fixed", zIndex: 1 },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: "100vh",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
    },
  },
});

interface MasterProps extends WithStyles<typeof styles> {
  open: boolean;
  handleDrawerClose: () => void;
}

const Master: React.SFC<MasterProps> = ({ classes, open, handleDrawerClose }) => (
  <Drawer
    variant="permanent"
    classes={{
      root: classes.root,
      paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
    }}
    open={open}
  >
    <div className={classes.toolbarIcon}>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <Retros />
  </Drawer>
);

export default withStyles(styles)(Master);
