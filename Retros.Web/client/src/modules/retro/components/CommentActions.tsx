import * as React from "react";
import { 
  Slide, 
  createStyles, 
  withStyles,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";

import { Close } from "@material-ui/icons";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { Comment } from "..";

const styles = createStyles({
  appBar: {
    position: "relative",
  },
  flex: {
    flex: 1,
  },
});

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

interface CommentActionsProps extends WithStyles<typeof styles> {
  open: boolean;
  handleClose: () => void;
  comment: Comment;
  handleSaveComment: (comment: Comment) => void;
}

export class CommentActions extends React.Component<CommentActionsProps, {comment: Comment}> {
  constructor(props: CommentActionsProps) {
    super(props);

    this.state = {
      comment: {...this.props.comment}
    };
  }
  render() {
    const { classes, open, handleClose, handleSaveComment } = this.props;
    return (
      <div>
        <Dialog
          fullScreen={true}
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                <Close />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Actions
              </Typography>
              <Button color="inherit" onClick={() => handleSaveComment(this.state.comment)}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            {this.props.comment.actions.map(a => 
            (
              <React.Fragment>
                <ListItem button={true}>
                  <ListItemText primary={a} secondary="Titania" />
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          )}
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CommentActions);
