import { Grid, createStyles, Toolbar, Chip, Avatar, Tooltip } from "@material-ui/core";
import * as React from "react";
import CommentCard from "./CommentCard";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { Group } from "..";
import { Add } from "../../../../node_modules/@material-ui/icons";

const styles = () => createStyles({
  root: {
    flexGrow: 1,
  },
});

interface CommentGroupProps extends WithStyles<typeof styles> {
  group: Group;
  handleOnEditComment: (commenId: string) => void;
}

const CommentGroup: React.SFC<CommentGroupProps> = (props: CommentGroupProps) => {
  return (
    <div>
      <Grid container={true} className={props.classes.root} alignContent={"center"} justify={"center"}>
        <Grid item={true} xs={10}>
          <Toolbar >
            <Avatar color="secondary">
              <Tooltip title="Add tag">
                <Add color="primary" />
              </Tooltip>
            </Avatar>
            {props.group.tags.map(t => (
              <Chip
                label={t}
              />)
            )}
          </Toolbar>
          <Grid
            container={true}
            direction={"row"}
            alignItems={"center"}
            justify={"center"}
            spacing={24}
          >
            {props.group.comments.map((comment, index) => (
              <Grid key={index} item={true} md={4}>
                <CommentCard
                  comment={comment}
                  handleOnEditComment={props.handleOnEditComment}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(CommentGroup);