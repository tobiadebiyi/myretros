import { Grid, createStyles, Toolbar, Chip, Avatar, Tooltip } from "@material-ui/core";
import * as React from "react";
import CommentCard from "./CommentCard";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { Group } from "..";
import { Add } from "../../../../node_modules/@material-ui/icons";
import  CommentActions from "./CommentActions";
import { Comment, GroupCommentModel } from "../state";

const styles = () => createStyles({
  root: {
    flexGrow: 1,
  },
});

export interface CommentGroupProps extends WithStyles<typeof styles> {
  group: Group;
  handleOnEditComment: (commenId: string) => void;
  saveComment: (retroId: string, model: GroupCommentModel) => void;
  retroId: string;
}

interface CommentGroupState {
  showActions: {show: boolean, comment?: Comment};
}

class CommentGroup extends React.Component<CommentGroupProps, CommentGroupState> {
  handleCloseCommentActions: () => void;
  handleOnSaveComment: (comment: Comment) => void;
  constructor(props: CommentGroupProps) {
    super(props);
    this.state = {
      showActions: {
        show: false
      }
    };

    this.handleCloseCommentActions = () => {
      this.setState({showActions: {
        show: false,
        comment: undefined,
      }});
    };

    this.handleOnSaveComment = (comment: Comment) => {
      const model: GroupCommentModel = {
        comment,
        groupId: this.props.group.id,
      };
      
      this.handleCloseCommentActions();
      this.props.saveComment(this.props.retroId, model );
    };
  }

  componentWillReceiveProps(props: CommentGroupProps) {
    debugger;
    return true;
  }

  render() {
    debugger;
    return (
      <React.Fragment>
        {this.state.showActions.comment && <CommentActions 
          open={this.state.showActions.show} 
          handleClose={this.handleCloseCommentActions} 
          comment={this.state.showActions.comment!}
          handleSaveComment={this.handleOnSaveComment}
        />}
        <Grid container={true} className={this.props.classes.root} alignContent={"center"} justify={"center"}>
          <Grid item={true} xs={10}>
            <Toolbar >
              <Avatar color="secondary">
                <Tooltip title="Add tag">
                  <Add color="primary" />
                </Tooltip>
              </Avatar>
              {this.props.group.tags.map(t => (
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
              {this.props.group.comments.map((comment, index) => (
                <Grid key={index} item={true} md={4}>
                  <CommentCard
                    comment={comment}
                    handleOnEditComment={this.props.handleOnEditComment}
                    showCommentActions={(c: Comment) => this.setState({showActions: {show: true, comment: c}})}
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