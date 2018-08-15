import * as React from "react";
import { Card, CardActions, CardContent, createStyles, withStyles, WithStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Comment } from "../state";

const styles = () => createStyles({
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  actions: {
    minHeight: 48,
  }
});

interface CommentCardProps extends WithStyles<typeof styles> {
  comment: Comment;
  handleOnEditComment: (commentId: string) => void;
}

export const CommentCard: React.SFC<CommentCardProps> = (props) => {
  return (
    <Card className={props.classes.card}>
      <CardContent>
        <Typography className={props.classes.title} color="default">
          {props.comment.text}
        </Typography>
      </CardContent>
      <CardActions className={props.classes.actions}>
        {props.comment.isOwner &&
          <Button
            size="small"
            color="primary"
            onClick={() => props.handleOnEditComment(props.comment.id!)}
          >
            Edit
          </Button>
        }
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(CommentCard);