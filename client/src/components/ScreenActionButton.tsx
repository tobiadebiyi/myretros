import * as React from "react";
import Zoom from "@material-ui/core/Zoom";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Fab from "@material-ui/core/Fab";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = (theme: Theme) => createStyles({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

export interface ScreenActionProps extends WithStyles<typeof styles> {
  theme: any;
  className?: string;
  icon: JSX.Element;
  color: "inherit" | "primary" | "secondary" | "default" | undefined;
  transitionIn: boolean;
  handleOnClick: () => void;
}

export const ScreenActionButton: React.SFC<ScreenActionProps> = (props: ScreenActionProps) => {
  const { theme, className, icon, color, transitionIn, handleOnClick } = props;

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Zoom
      in={transitionIn}
      timeout={transitionDuration}
      style={{
        transitionDelay: transitionIn ? transitionDuration.exit : 0,
      }}
      unmountOnExit={true}
    >
      <Fab
        className={className}
        color={color}
        onClick={handleOnClick}
      >
        {icon}
      </Fab>
    </Zoom>
  );
};

export default withStyles(styles, { withTheme: true })(ScreenActionButton);
