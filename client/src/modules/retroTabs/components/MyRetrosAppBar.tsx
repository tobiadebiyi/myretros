import * as React from "react";
import { Retro } from "../state";
import { MenuRounded } from "@material-ui/icons";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
});

interface MyRetrosAppBarProps extends WithStyles<typeof styles> {
  gotoList: () => void;
  retro: Retro;
}

const MyRetrosAppBar: React.SFC<MyRetrosAppBarProps> = (props) => {
  const { classes, gotoList, retro } = props;
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuRounded onClick={gotoList} />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          My Retros
        </Typography>
        <Typography
          variant="subtitle1"
          color="inherit"
          className={classes.grow}
          style={{ textAlign: "center" }}
        >
          {retro.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles, { withTheme: true })(MyRetrosAppBar);