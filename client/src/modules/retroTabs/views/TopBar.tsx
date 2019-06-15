import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import * as classNames from "classnames";
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
  location: string;
  open: boolean;
}

const TopBar: React.SFC<TopBarProps> = ({ classes, handleDrawerOpen, location: location, open }) => (
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
        {location && <span> > {name}</span>}
      </Typography>
      <IconButton
        color="inherit"
        aria-label="share retro"
        onClick={handleDrawerOpen}
        className={classNames(
          classes.menuButton,
          open && classes.menuButtonHidden,
        )}
      >
        <ShareIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(TopBar);
