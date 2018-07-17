import  * as React from "react";
import { 
    Dialog, 
    DialogActions, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    Input 
} from "material-ui";

export interface EditTextDialogProps {
    open: boolean;
    handleClose: () => void;
    text: string;
    title: string;
    handleSave: (text: string) => void;
    message?: string;
    multiline?: boolean;
}

interface EditTextDialogState {
    text: string;
    isDirty: boolean;
}

export class EditTextDialog extends React.Component<EditTextDialogProps, EditTextDialogState> {
    constructor(props: EditTextDialogProps) {
        super(props);

        this.state = {
            text: props.text,
            isDirty: false,
        };
    }

    handleOnCommentChange = (event: any) => {
        this.setState({
          text: event.target.value,
          isDirty: true,
        });
      }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
            <DialogContent 
                style={{minWidth: "400px"}}
            >
                {this.props.message &&
                <DialogContentText>
                  {this.props.message}
                </DialogContentText>
                }
                <Input
                    autoFocus={true}
                    margin="dense"
                    id="comment"
                    multiline={this.props.multiline}
                    rows={5}
                    rowsMax={10}
                    type="text"
                    fullWidth={true}
                    onChange={this.handleOnCommentChange}
                    value={this.state.text}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                Cancel
                </Button>
                <Button
                    onClick={() => this.props.handleSave(this.state.text)}
                    color="primary"
                    disabled={!this.state.isDirty}
                >
                Save
                </Button>
            </DialogActions>
            </Dialog>
        );
    }
}