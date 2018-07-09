import * as React from "react";
import Button from "material-ui/Button";
import { Input } from "material-ui";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "material-ui/Dialog";

interface EditCommentDialogProps {
  open: boolean;
  handleOnSave: (text: string) => void;
  handleClose: () => void;
  text: string;
}

interface AddCommentDialogState {
  commentText: string;
  isDirty: boolean;
}

export class EditCommentDialog extends React.Component<EditCommentDialogProps, AddCommentDialogState> {
  constructor(props: EditCommentDialogProps, context: any) {
    super(props);

    this.state = {
      commentText: props.text ? props.text : "",
      isDirty: false,
    };
  }

  componentWillReceiveProps(newProps: EditCommentDialogProps) {
    if (!this.state.isDirty) {
      this.setState({
        commentText: newProps.text
      });
    }
  }

  handleOnCommentChange = (event: any) => {
    this.setState({
      commentText: event.target.value,
      isDirty: true,
    });
  }

  resetState = () => {
    this.setState({
      commentText: "",
      isDirty: false,
    });
  }

  saveComment = () => {
    this.props.handleOnSave(this.state.commentText);
    this.resetState();
  }

  handleClose = () => {
    this.props.handleClose();
    this.resetState();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.text ? "Edit Comment" : "Add Comment"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your comment here.
          </DialogContentText>
            <Input
              autoFocus={true}
              margin="dense"
              id="comment"
              multiline={true}
              rows={5}
              rowsMax={10}
              type="text"
              fullWidth={true}
              onChange={this.handleOnCommentChange}
              value={this.state.commentText}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.saveComment}
              color="primary"
              disabled={!this.state.isDirty}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
