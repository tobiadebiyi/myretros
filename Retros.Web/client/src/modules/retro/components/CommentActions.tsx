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
import { Comment, Action } from "..";
import { EditCommentDialog } from "./EditCommentDialog";

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

interface CommentActionsState {
  comment: Comment;
  action?: Action;
}

export class CommentActions extends React.Component<CommentActionsProps, CommentActionsState> {
  handleOnAddAction: (action: Action) => void;
  handleOnUpdateAction: (action: Action) => void;
  handleOnSaveAction: (text: string) => void;
  handleCloseDialog: () => void;
  handelAddNewAction: () => void;
  constructor(props: CommentActionsProps) {
    super(props);

    this.state = {
      comment: { ...this.props.comment }
    };

    this.handleOnAddAction = (action: Action) => {
      const comment = { ...this.state.comment };
      comment.actions.push(action);

      this.setState({ comment });
    };

    this.handleOnUpdateAction = (action: Action) => {
      const comment = { ...this.state.comment };
      const actionIndex = comment.actions.findIndex(a => a.id === action.id);

      if (actionIndex === -1) return;

      comment.actions.splice(actionIndex, 1, action);

      this.setState({ comment });
    };

    this.handleOnSaveAction = (text: string) => {
      const action = { ...this.state.action, text } as Action;

      if (action.id === undefined) {
        this.handleOnAddAction(action);
      } else {
        this.handleOnUpdateAction(action);
      }
    };

    this.handleCloseDialog = () => {
      this.setState({ action: undefined });
    };

    this.handelAddNewAction = () => {
      const emptyAction: Action = {
        text: "",
        commentId: this.state.comment.id!,
      };

      this.setState({ action: emptyAction });
    };
  }

  render() {
    const { classes, open, handleClose, handleSaveComment } = this.props;
    const action = { ...this.state.action } as Action;
    return (
      <div>
        <EditCommentDialog
          handleOnSave={() => this.handleOnSaveAction}
          open={action !== undefined}
          handleClose={this.handleCloseDialog}
          text={action ? action.text : ""}
        />
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
          <Button onClick={this.handelAddNewAction}>
            Add Action
          </Button>
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
