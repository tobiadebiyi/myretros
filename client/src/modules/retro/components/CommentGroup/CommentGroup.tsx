import * as React from "react";
import { createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import CommentCard from "../CommentCard";
import CommentActions from "../CommentActions";
import { Comment, GroupCommentModel, Action } from "../../state";
import EditTextDialog from "src/components/EditTextDialog";
import { Group } from "../..";
import GroupStatus from "./GroupStatus";

const styles = () => createStyles({
  root: {
    overflowY: "scroll",
    height: "100%",
  },
  comments: { flexGrow: 1, padding: "0 1em" },
  comment: { width: "auto" },
  "@media (max-width: 450px)": {
    comment: {
      width: "100%",
    },
  }
});

export interface CommentGroupProps extends WithStyles<typeof styles> {
  group: Group;
  retroId: string;
  isAdmin: boolean;
  handleOnEditComment: (commenId: string) => void;
  saveComment: (retroId: string, model: GroupCommentModel) => void;
  toggleGroupVisibility?: (retroId: string, groupId: string) => void;
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
    const { isAdmin, group, retroId, toggleGroupVisibility, classes, handleOnEditComment } = this.props;
    const { showActions, comment, editAction, action } = this.state;
    return (
      <div className={classes.root}>
        <GroupStatus
          isAdmin={isAdmin}
          group={group}
          retroId={retroId}
          toggleGroupVisibility={toggleGroupVisibility}
        />

        {showActions &&
          <CommentActions
            open={showActions}
            handleClose={this.handleCloseCommentActions}
            comment={comment!}
            handleSaveComment={this.handleOnSaveComment}
            handelAddNewAction={this.handelAddNewAction}
            handleEditAction={this.handleOnUpdateAction}
          />
        }
        {editAction &&
          <EditTextDialog
            handleOnSave={this.handleOnSaveAction}
            open={action !== undefined}
            handleClose={this.handleCloseDialog}
            text={action!.text}
            name="action"
          />
        }
        <Grid container={true} className={classes.comments} alignContent={"center"} justify={"center"}>
          <Grid
            container={true}
            direction={"row"}
            alignItems={"center"}
            justify={"center"}
            spacing={5}
          >
            {group.comments.map((c, index) => (
              <Grid key={index} item={true} xs={12} sm={6} md={4} className={classes.comment}>
                <CommentCard
                  comment={c}
                  handleOnEditComment={handleOnEditComment}
                  showCommentActions={(_: Comment) => this.setState({ showActions: true, comment: _ })}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(CommentGroup);
