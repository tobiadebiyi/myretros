import * as React from "react";
import { Group, Retro, Comment } from "../..";
import Slide from "@material-ui/core/Slide";
import green from "@material-ui/core/colors/green";
import AddIcon from "@material-ui/icons/Add";
import Mood from "@material-ui/icons/Mood";
import MoodBad from "@material-ui/icons/MoodBad";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import * as classNames from "classnames";
import EditTextDialog from "src/components/EditTextDialog";
import ScreenActionButton from "src/components/ScreenActionButton";

import CommentGroup from "../CommentGroup";
import { GroupCommentModel } from "../../state";

const styles = theme => createStyles({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  } as any,
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
});

export interface RetroTabsProps extends WithStyles<typeof styles> {
  retro: Retro;
  isAdmin: boolean;
  saveComment: (retroId: string, model: GroupCommentModel) => void;
  gotoList: () => void;
}

interface EditCommentState {
  openAddCommentDialog: boolean;
  commentGroupId: string;
  comment?: Comment;
}

interface RetroTabsState {
  tabIndex: number;
  editCommentState: EditCommentState;
}

interface ButtonStyle {
  color: "inherit" | "primary" | "secondary" | "default" | undefined;
  className: string;
  icon: any;
}

export class TabView extends React.Component<RetroTabsProps, RetroTabsState> {
  buttons: ButtonStyle[] = [
    {
      color: "primary",
      className: classNames(this.props.classes.fab, this.props.classes.fabGreen),
      icon: <Mood />,
    },
    {
      color: "secondary",
      className: this.props.classes.fab,
      icon: <MoodBad />,
    },
    {
      color: "inherit",
      className: classNames(this.props.classes.fab, this.props.classes.fabGreen),
      icon: <AddIcon />,
    }
  ];

  constructor(props: RetroTabsProps) {
    super(props);

    this.state = {
      tabIndex: 0,
      editCommentState: {
        openAddCommentDialog: false,
        commentGroupId: "",
        comment: {},
      } as EditCommentState,
    };
  }

  handleOpenCommentDialog = (groupId: string, comment: Comment) => {
    this.setState({
      editCommentState: {
        openAddCommentDialog: true,
        commentGroupId: groupId,
        comment,
      }
    });
  }

  handleCloseCommentDialog = () => {
    this.setState({
      editCommentState: {
        openAddCommentDialog: false,
        commentGroupId: "",
      }
    });
  }

  handleOnSaveComment = (text: string) => {
    var state = this.state;
    this.setState({
      editCommentState: {
        ...state.editCommentState,
        openAddCommentDialog: false,
      }
    });

    var comment = {
      ...state.editCommentState.comment,
      text: text,
      isOwner: true,
    } as Comment;

    const request = {
      groupId: state.editCommentState.commentGroupId,
      comment,
    };

    this.props.saveComment(this.props.retro.id!, request);
  }

  handleOnEditComment = (commentId: string) => {
    const group = this.props.retro.groups
      .filter(g => g.comments.some(c => c.id === commentId))[0];

    const comment = group.comments.find(c => c.id === commentId);

    if (!comment) return;

    this.handleOpenCommentDialog(group.id, comment);
  }

  renderCommentGroup = (group: Group, index: number) => {
    const { isAdmin, retro, saveComment } = this.props;
    const { tabIndex } = this.state;

    if (group === undefined) { return; }
    return (
      <Slide key={index} direction="right" in={tabIndex === index} mountOnEnter={true} unmountOnExit={true}>
        <div style={{ padding: 8 * 3, height: "600px" }}>
          <CommentGroup
            isAdmin={isAdmin}
            group={group}
            handleOnEditComment={this.handleOnEditComment}
            saveComment={saveComment}
            retroId={retro.id}
          />
        </div>
      </Slide>
    );
  }

  handleChangeIndex = (__: any, tabIndex: any) => {
    this.setState({ tabIndex });
  }

  renderEditCommentDialog = () => {
    const comment = this.state.editCommentState.comment;

    return (
      <EditTextDialog
        open={this.state.editCommentState.openAddCommentDialog}
        handleClose={this.handleCloseCommentDialog}
        handleOnSave={this.handleOnSaveComment}
        text={comment ? comment.text : ""}
        name="comment"
        message={`Please enter your comment here.`}
        multiline={true}
        maxLength={100}
      />
    );
  }

  renderRetro() {
    const { retro } = this.props;
    const { tabIndex } = this.state;

    return (
      <div>
        <React.Fragment>
          <Tabs
            value={tabIndex}
            onChange={this.handleChangeIndex}
            centered={true}
            color="default"
          >
            {retro.groups.map((g, i) => (
              <Tab key={i} label={g.name} />
            ))}
          </Tabs>
          {retro.groups.map((__, index) => (
            this.renderCommentGroup(retro.groups[tabIndex], index)
          ))}

          {this.buttons.map((button: ButtonStyle, index: number) => (
            <ScreenActionButton
              key={index}
              {...button}
              transitionIn={this.state.tabIndex === index}
              handleOnClick={() => {
                const newComment = {
                  isOwner: true,
                  text: "",
                  actions: [],
                };
                this.handleOpenCommentDialog(retro.groups[tabIndex].id, newComment);
              }}
            />
          ))}
        </React.Fragment>
        {this.renderEditCommentDialog()}
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        {this.props.retro ? this.renderRetro() : <p>Loading retro .....</p>}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TabView);