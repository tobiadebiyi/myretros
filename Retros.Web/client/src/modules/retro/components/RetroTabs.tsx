import * as React from "react";
import {
  withStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
} from "material-ui";

import { Group, Retro, Comment } from "..";
import Slide from "material-ui/transitions/Slide";

import green from "material-ui/colors/green";
import AddIcon from "@material-ui/icons/Add";
import Mood from "@material-ui/icons/Mood";
import MoodBad from "@material-ui/icons/MoodBad";
import SwipeableViews from "react-swipeable-views";
import * as classNames from "classnames";
import { EditCommentDialog } from "./EditCommentDialog";
import { ScreenActionButton } from "../../../components/ScreenActionButton";

import CommentGroup from "./CommentGroup";
import { GroupCommentModel } from "../state";

interface TabContainerProps {
  classes?: any;
  children: any;
}

const TabContainer: React.SFC<TabContainerProps> = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3, height: "600px" }}>
      {props.children}
    </Typography>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
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

export interface RetroTabsProps {
  classes: any;
  retro: Retro;
  retroId: string;
  theme: any;
  saveComment: (retroId: string, model: GroupCommentModel) => void;
  joinRetro: (retroId: string) => void;
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
            comments={group.comments}
            handleOnEditComment={this.handleOnEditComment}
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
      <EditCommentDialog
        open={this.state.editCommentState.openAddCommentDialog}
        handleClose={this.handleCloseCommentDialog}
        handleOnSave={this.handleOnSaveComment}
        text={comment ? comment.text : ""}
      />
    );
  }

  renderRetro() {
    const { theme, retro } = this.props;
    const { tabIndex } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={tabIndex}
            onChange={this.handleChangeIndex}
            centered={true}
          >
            {this.props.retro.groups.map((g, i) => (
              <Tab key={i} label={g.name} />
            ))}
          </Tabs>
        </AppBar>
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
                };
                this.handleOpenCommentDialog(retro.groups[tabIndex].id, newComment);
              }}
            />
          ))}
        </div>
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