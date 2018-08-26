import * as React from "react";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

interface EditTextDialogProps {
  open: boolean;
  handleOnSave: (text: string) => void;
  handleClose: () => void;
  text: string;
  name: string;
}

interface EditTextDialogState {
  commentText: string;
  isDirty: boolean;
}

export class EditTextDialog extends React.Component<EditTextDialogProps, EditTextDialogState> {
  constructor(props: EditTextDialogProps, context: any) {
    super(props);

    this.state = {
      commentText: props.text ? props.text : "",
      isDirty: false,
    };
  }

  componentWillReceiveProps(newProps: EditTextDialogProps) {
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
          <DialogTitle id="form-dialog-title">
            {this.props.text ? `Edit ${this.props.name}` : `Add ${this.props.name}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Please enter your ${this.props.name} here.`}
            </DialogContentText>
            <Input
              autoFocus={true}
              margin="dense"
              id={this.props.name}
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
