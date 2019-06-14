import * as React from "react";
import { Group } from "../..";
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { amber } from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const styles = () => createStyles({
  root: {
    flexGrow: 1,
  },
  groupNotification: {
    display: "flex",
    justifyContent: "space-around",
    minHeight: "1em",
    marginBottom: "1em",
    "& p": { color: amber[900], alignSelf: "center", padding: "1em", },
  },
  allowComments: { padding: "1em" }
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
        <FormControlLabel
          className={classes.allowComments}
          control={
            <Switch
              checked={group.commentsArePublic}
              onChange={() => toggleGroupVisibility!(retroId, group.id)}
              inputProps={{ "aria-label": "Share comments" }}
            />
          }
          label="Share comments"
        />
      </div>
    }
  </React.Fragment >
);

export default withStyles(styles)(GroupStatus);
