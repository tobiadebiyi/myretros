import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Input from "@material-ui/core/Input";
import DialogActions from "@material-ui/core/DialogActions";

export interface EditTextDialogProps {
  open: boolean;
  handleOnSave: (text: string) => void;
  handleClose: () => void;
  text: string;
  name: string;
  multiline?: boolean;
  message?: string;
  submitButtonName?: string;
  maxLength?: number;
}

interface EditTextDialogState {
  commentText: string;
  isDirty: boolean;
}

export class EditTextDialog extends React.Component<EditTextDialogProps, EditTextDialogState> {
  public static defaultProps = { maxLength: 50 };

  handleKeyPress: (ev: any) => void;
  constructor(props: EditTextDialogProps, context: any) {
    super(props);

    this.state = {
      commentText: props.text ? props.text : "",
      isDirty: false,
    };

    this.handleKeyPress = (ev: any) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        this.saveComment();
      }
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
    const { maxLength } = this.props;
    const { target: { value } } = event;

    if (value.length >= maxLength!) return;

    this.setState({
      commentText: value,
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
    const { message, submitButtonName, multiline, name, maxLength } = this.props;
    const { commentText, isDirty } = this.state;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.props.text ? `Edit ${name}` : `Add ${name}`}
          </DialogTitle>
          <DialogContent style={{ minWidth: "400px" }}>
            {message &&
              <DialogContentText>
                {message}
              </DialogContentText>
            }
            <Input
              autoFocus={true}
              margin="dense"
              id={this.props.name}
              multiline={multiline}
              rows={5}
              rowsMax={10}
              type="text"
              fullWidth={true}
              onChange={this.handleOnCommentChange}
              value={commentText}
              onKeyPress={this.handleKeyPress}
            />
          </DialogContent>
          <DialogActions>
            <span>{commentText && `Characters left: ${maxLength! - commentText.length}`}</span>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.saveComment}
              color="primary"
              disabled={!isDirty}
            >
              {submitButtonName ? submitButtonName : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
