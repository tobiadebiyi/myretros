import * as React from "react";
import { Close, Add } from "@material-ui/icons";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { Comment, Action } from "..";
import ScreenActionButton from "../../../components/ScreenActionButton";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

const styles = (theme: Theme) => createStyles({
  appBar: {
    position: "relative",
  },
  flex: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  } as any,
});

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

interface CommentActionsProps extends WithStyles<typeof styles> {
  open: boolean;
  handleClose: () => void;
  comment: Comment;
  handleSaveComment: (comment: Comment) => void;
  handelAddNewAction: () => void;
  handleEditAction: (action: Action) => void;
}

interface CommentActionsState {
  comment: Comment;
}

export class CommentActions extends React.Component<CommentActionsProps, CommentActionsState> {
  constructor(props: CommentActionsProps) {
    super(props);

    this.state = {
      comment: { ...this.props.comment }
    };
  }

  render() {
    const { classes, open, handleClose } = this.props;
    return (
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
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Actions
              </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {this.props.comment.actions.map((a, index) =>
            (
              <React.Fragment key={index}>
                <ListItem button={true}>
                  <ListItemText primary={a.text} />
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          )}
        </List>
        <ScreenActionButton
          color="primary"
          icon={<Add />}
          transitionIn={true}
          handleOnClick={this.props.handelAddNewAction}
          className={this.props.classes.fab}
        />
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CommentActions);
