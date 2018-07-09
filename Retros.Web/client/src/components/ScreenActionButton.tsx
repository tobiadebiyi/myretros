import * as React from "react";
import { Button } from "material-ui";
import Zoom from "material-ui/transitions/Zoom";
import withStyles from "material-ui/styles/withStyles";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  } as any,
});

export interface ScreenActionProps {
  theme: any;
  className: string;
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
      <Button
        variant="fab"
        className={className}
        color={color}
        onClick={handleOnClick}
      >
        {icon}
      </Button>
    </Zoom>
  );
};

export default withStyles(styles, { withTheme: true })(ScreenActionButton);
