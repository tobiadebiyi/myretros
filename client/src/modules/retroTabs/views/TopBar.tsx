import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import * as classNames from "classnames";

import { Retro } from "../state";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

const drawerWidth = 240;

const styles = theme => createStyles({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
});

interface TopBarProps extends WithStyles<typeof styles> {
  handleDrawerOpen: () => void;
  retro: Retro;
}

const TopBar: React.SFC<TopBarProps> = ({ classes, handleDrawerOpen, retro }) => (
  <AppBar
    position="absolute"
    className={classNames(classes.appBar, open && classes.appBarShift)}
  >
    <Toolbar disableGutters={!open} className={classes.toolbar}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={handleDrawerOpen}
        className={classNames(
          classes.menuButton,
          open && classes.menuButtonHidden,
        )}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        color="inherit"
        noWrap={true}
      >
        MyRetros
      </Typography>
      <Typography
        variant="subtitle1"
        color="inherit"
        style={{ textAlign: "center", fontSize: "1.1em", marginLeft: "0.4em" }}
      >
        {retro && <span> > {retro.name}</span>}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(TopBar);
