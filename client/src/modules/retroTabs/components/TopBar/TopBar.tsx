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
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";

const drawerWidth = 240;

const styles = theme => createStyles({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    justifyContent: "space-between",
  },
  toolBarLeft: {
    display: "flex",
    alignItems: "flex-end",
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
    marginLeft: 4,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
});

interface TopBarProps extends WithStyles<typeof styles> {
  handleDrawerOpen: () => void;
  location?: string;
  open: boolean;
  retroReference: string;
  showSnackBar: (message: string) => void;
  isAdmin: boolean;
}

const TopBar: React.SFC<TopBarProps> = ({
  classes,
  handleDrawerOpen,
  location,
  open,
  retroReference,
  showSnackBar,
  isAdmin,
}) => (
    <AppBar
      position="absolute"
      className={classNames(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar disableGutters={!open} className={classes.toolbar}>
        <div className={classes.toolBarLeft}>
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
            {location && <span> > {location}</span>}
          </Typography>
        </div>
        {isAdmin &&
          (<CopyToClipboard text={retroReference} onCopy={() => showSnackBar("Copied to clipboard")} >
            <Tooltip title="Copy retro reference">
              <IconButton color="inherit" aria-label="Copy retro reference"><ShareIcon /></IconButton>
            </Tooltip>
          </CopyToClipboard>
          )}
      </Toolbar>
    </AppBar>
  );

export default withStyles(styles)(TopBar);
