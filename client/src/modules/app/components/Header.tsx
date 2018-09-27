import { withStyles, Theme, createStyles, WithStyles, } from "@material-ui/core/styles";
import * as React from "react";
import { Grid } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  logo: { ...theme.typography.button, alignContent: "center", flexWrap: "wrap" },
  center: { textAlign: "center" }
});

const Header: React.SFC<WithStyles<typeof styles>> = (props) => {
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
          <h1 className={props.classes.center}>My Retros</h1>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Header);
