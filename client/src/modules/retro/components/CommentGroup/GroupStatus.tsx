import * as React from "react";
import { Group } from "../..";
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { amber } from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";

const styles = () => createStyles({
  root: {
    flexGrow: 1,
  },
  groupNotification: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "1em",
    margin: "0 1em 1em 0;",
    "& p": { color: amber[900], alignSelf: "center", padding: "1em", },
  },
  adminSwitch: {
    alignSelf: "flex-end",
  }
});

export interface GroupStatusProps extends WithStyles<typeof styles> {
  isAdmin: boolean;
  toggleGroupVisibility: ((retroId: string, groupId: string) => void) | undefined;
  retroId: string;
  group: Group;
}

const GroupStatus: React.SFC<GroupStatusProps> = ({ isAdmin, toggleGroupVisibility, retroId, group, classes }) => (
  <React.Fragment>
    {!isAdmin && !group.commentsArePublic &&
      <div className={classes.groupNotification}>
        <Typography>
          Comments are currently private.
          You will only see your own comments until an administrator admin makes shares the comments.
      </Typography>
      </div>
    }
    {isAdmin &&
      <div className={classes.groupNotification}>
        <div className={classes.adminSwitch}>
          <span>Private</span>
          <Switch
            checked={group.commentsArePublic}
            onChange={() => toggleGroupVisibility!(retroId, group.id)}
            inputProps={{ "aria-label": "Share comments" }}
          />
          <span>Public</span>
        </div>
      </div>
    }
  </React.Fragment >
);

export default withStyles(styles)(GroupStatus);
