import * as React from "react";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { Comment } from "../state";

const styles = {
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
};

interface CommentCardProps {
  comment: Comment;
  handleOnEditComment: (commentId: string) => void;
}

export const CommentCard: React.SFC<CommentCardProps> = ({ comment, handleOnEditComment }) => {
  return (
    <Card style={styles.card}>
      <CardContent>
        <Typography style={styles.title} color="default">
          {comment.text}
        </Typography>
      </CardContent>
      <CardActions style={styles.actions}>
        {comment.isOwner &&
          <Button
            size="small"
            color="primary"
            onClick={() => handleOnEditComment(comment.id!)}
          >
            Edit
          </Button>
        }
      </CardActions>
    </Card>
  );
};