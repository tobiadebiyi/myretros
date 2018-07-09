import { withStyles, } from "material-ui/styles";
import * as React from "react";
import { Grid } from "material-ui";

const styles = theme => ({
  logo: { ...theme.typography.button, alignContent: "center", flexWrap: "wrap" },
  center: { textAlign: "center" }
});

export interface HeaderProps {
  classes?: any;
}

const Header: React.SFC<HeaderProps> = (props) => {
  return (
    <div>
      <Grid
        container={true}
        direction={"row"}
        alignItems={"center"}
        alignContent={"center"}
        justify={"center"}
      >
        <Grid
          xs={4}
          item={true}
          className={props.classes.logo}
        >
          <h1 className={props.classes.center}>Retro</h1>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Header);