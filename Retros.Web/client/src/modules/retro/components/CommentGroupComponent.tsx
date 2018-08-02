import { Grid } from "material-ui";
import * as React from "react";
import { CommentCard } from "./CommentCard";
import withStyles from "material-ui/styles/withStyles";
import { Comment } from "..";

interface CommentGroupProps {
  comments: Comment[];
  classes?: any;
  handleOnEditComment: (commenId: string) => void;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

const CommentGroupComponent: React.SFC<CommentGroupProps> = (props: CommentGroupProps) => {
  return (
    <div>
      <Grid container={true} className={props.classes.root} alignContent={"center"} justify={"center"}>
        <Grid item={true} xs={10}>
          <Grid
            container={true}
            direction={"row"}
            alignItems={"center"}
            justify={"center"}
          >
            {props.comments.map((comment, index) => (
              <Grid key={index} item={true}>
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

export default withStyles(styles)(CommentGroupComponent);