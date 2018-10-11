import * as React from "react";
import {
  withStyles,
  Tabs,
  Tab,
  WithStyles,
} from "@material-ui/core";

import { Group, Retro, Comment } from "..";
import Slide from "@material-ui/core/Slide";

import green from "@material-ui/core/colors/green";
import AddIcon from "@material-ui/icons/Add";
import Mood from "@material-ui/icons/Mood";
import MoodBad from "@material-ui/icons/MoodBad";
import SwipeableViews from "react-swipeable-views";
import * as classNames from "classnames";
import { EditTextDialog } from "../../../components/EditTextDialog";
import ScreenActionButton from "../../../components/ScreenActionButton";
import { TabContainer } from "./TabContainer";

import CommentGroup from "../components/CommentGroup";
import { GroupCommentModel } from "../state";
// import MyRetrosAppBar from "./MyRetrosAppBar";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  } as any,
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
});

export interface RetroTabsProps extends WithStyles<typeof styles> {
  retro: Retro;
  retroId: string;
  theme: any;
  saveComment: (retroId: string, model: GroupCommentModel) => void;
  joinRetro: (retroId: string) => void;
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

class RetroTabs extends React.Component<RetroTabsProps, RetroTabsState> {
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

  constructor(props: RetroTabsProps, context: any) {
    super(props);

    this.state = {
      tabIndex: 0,
      editCommentState: {
        openAddCommentDialog: false,
        commentGroupId: "",
        comment: {},
      } as EditCommentState,
    };

    this.props.joinRetro(this.props.retroId);
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

    this.props.saveComment(this.props.retroId, request);
  }

  handleOnEditComment = (commentId: string) => {
    const group = this.props.retro.groups
      .filter(g => g.comments.some(c => c.id === commentId))[0];

    const comment = group.comments.find(c => c.id === commentId);

    if (!comment) return;

    this.handleOpenCommentDialog(group.id, comment);
  }

  renderCommentGroup = (group: Group, index: number) => {
    if (group === undefined) { return; }
    return (
      <Slide key={index} direction="right" in={this.state.tabIndex === index} mountOnEnter={true} unmountOnExit={true}>
        <TabContainer>
          <CommentGroup
            group={group}
            handleOnEditComment={this.handleOnEditComment}
            saveComment={this.props.saveComment}
            retroId={this.props.retroId}
          />
        </TabContainer>
      </Slide>
    );
  }

  handleChangeIndex = (event, tabIndex) => {
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
      />
    );
  }

  renderRetro() {
    const { theme, retro } = this.props;
    const { tabIndex } = this.state;

    return (
      <div>
        {/* <MyRetrosAppBar retro={retro} gotoList={this.props.gotoList} /> */}
        <React.Fragment>
          <React.Fragment>
            <Tabs
              value={tabIndex}
              onChange={this.handleChangeIndex}
              centered={true}
              color="default"
            >
              {this.props.retro.groups.map((g, i) => (
                <Tab key={i} label={g.name} />
              ))}
            </Tabs>
          </React.Fragment>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={tabIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            {retro.groups.map((group, index) => (
              this.renderCommentGroup(retro.groups[tabIndex], index)
            ))}
          </SwipeableViews>
          <div>
            {this.buttons.map((button: ButtonStyle, index: number) => (
              <ScreenActionButton
                key={index}
                theme={theme}
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
          </div>
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

export default withStyles(styles, { withTheme: true })(RetroTabs);