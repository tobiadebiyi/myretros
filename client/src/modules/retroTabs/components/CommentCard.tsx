import * as React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Comment } from "../state";
import createStyles from "@material-ui/core/styles/createStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import CardActions from "@material-ui/core/CardActions";

const styles = () => createStyles({
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
  showCommentActions: (comment: Comment) => void;
}

export const CommentCard: React.SFC<CommentCardProps> = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography className={props.classes.title}>
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
        <Button
          onClick={() => props.showCommentActions(props.comment)}
        >
          Actions
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(CommentCard);