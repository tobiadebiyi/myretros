import * as React from "react";
import { createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import CommentCard from "./CommentCard";
import { Group } from "..";
import CommentActions from "./CommentActions";
import { Comment, GroupCommentModel, Action } from "../state";
import { EditTextDialog } from "../../../components/EditTextDialog";
import { amber } from "@material-ui/core/colors";

const styles = () => createStyles({
  root: {
    flexGrow: 1,
  },
  groupNotification: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: amber[100],
    color: amber[900],
    minHeight: "3em",
    marginBottom: "1em",
    padding: "1em",
    "& button": {
      backgroundColor: amber[600],
      color: "#ffffff",
    }
  },
  button: {
    minHeight: "4em",
    padding: "1em",
    cursor: "pointer",
    border: 0,
  }
});

export interface CommentGroupProps extends WithStyles<typeof styles> {
  group: Group;
  handleOnEditComment: (commenId: string) => void;
  saveComment: (retroId: string, model: GroupCommentModel) => void;
  retroId: string;
  isAdmin?: boolean;
}

interface CommentGroupState {
  showActions: boolean;
  editAction: boolean;
  comment?: Comment;
  action?: Action;
}

class CommentGroup extends React.Component<CommentGroupProps, CommentGroupState> {
  handleCloseCommentActions: () => void;
  handleOnSaveComment: (comment: Comment) => void;
  handleOnAddAction: (action: any) => void;
  handleOnUpdateAction: (action: any) => void;
  handleOnSaveAction: (text: string) => void;
  handleCloseDialog: () => void;
  handelAddNewAction: () => void;
  constructor(props: CommentGroupProps) {
    super(props);
    this.state = {
      showActions: false,
      editAction: false,
    };

    this.handleCloseCommentActions = () => {
      this.setState({
        showActions: false,
        comment: undefined,
      });
    };

    this.handleOnSaveComment = (comment: Comment) => {
      const model: GroupCommentModel = {
        comment,
        groupId: this.props.group.id,
      };

      this.props.saveComment(this.props.retroId, model);
    };

    this.handleOnAddAction = (action: Action) => {
      const comment = { ...this.state.comment } as Comment;
      comment.actions.push(action);

      this.setState({ comment, showActions: true, editAction: false });
      this.handleOnSaveComment(comment);
    };

    this.handleOnUpdateAction = (action: Action) => {
      const comment = { ...this.state.comment } as Comment;
      const actionIndex = comment.actions
        .findIndex(a => a.id === action.id);

      if (actionIndex === -1) return;

      comment.actions.splice(actionIndex, 1, action);

      this.setState({ comment });
    };

    this.handleOnSaveAction = (text: string) => {
      const action = { ...this.state.action, text } as Action;
      debugger;
      if (action.id === undefined) {
        this.handleOnAddAction(action);
      } else {
        this.handleOnUpdateAction(action);
      }
    };

    this.handleCloseDialog = () => {
      this.setState({ action: undefined, editAction: false });
    };

    this.handelAddNewAction = () => {
      const emptyAction: Action = {
        text: "",
        commentId: this.state.comment!.id!,
      };

      this.setState({ action: emptyAction, editAction: true });
    };
  }

  render() {
    const { isAdmin } = this.props;

    const ClosedForComments = () => (
      <div className={this.props.classes.groupNotification}>
        <Typography>
          This group is currently private. You will only see your own comments until a retro admin makes it public.
        </Typography>
        {isAdmin &&
          <button className={this.props.classes.button} onClick={() => alert("making public")}>Make public</button>
        }
      </div>
    );

    return (
      <React.Fragment>
        {!this.props.group.commentsArePublic && <ClosedForComments />}
        {this.state.showActions && <CommentActions
          open={this.state.showActions}
          handleClose={this.handleCloseCommentActions}
          comment={this.state.comment!}
          handleSaveComment={this.handleOnSaveComment}
          handelAddNewAction={this.handelAddNewAction}
          handleEditAction={this.handleOnUpdateAction}
        />}
        {this.state.editAction && <EditTextDialog
          handleOnSave={this.handleOnSaveAction}
          open={this.state.action !== undefined}
          handleClose={this.handleCloseDialog}
          text={this.state.action!.text}
          name="action"
        />}
        <Grid container={true} className={this.props.classes.root} alignContent={"center"} justify={"center"}>
          <Grid item={true} xs={10}>
            <Grid
              container={true}
              direction={"row"}
              alignItems={"center"}
              justify={"center"}
              spacing={24}
            >
              {this.props.group.comments.map((comment, index) => (
                <Grid key={index} item={true} md={4}>
                  <CommentCard
                    comment={comment}
                    handleOnEditComment={this.props.handleOnEditComment}
                    showCommentActions={(c: Comment) => this.setState({ showActions: true, comment: c })}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CommentGroup);