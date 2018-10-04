import * as React from "react";
import {
    Dialog,
    DialogActions,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField
} from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";

export interface EditTextDialogProps {
    open: boolean;
    handleClose: () => void;
    text: string;
    title: string;
    handleSubmit: (text: string) => void;
    message?: string;
    multiline?: boolean;
    submitButtonName?: string;
}

interface EditTextDialogState {
    text: string;
    isDirty: boolean;
}

export class EditTextDialog extends React.Component<EditTextDialogProps, EditTextDialogState> {
    handleKeyPress: (ev: any) => void;
    
    constructor(props: EditTextDialogProps) {
        super(props);

        this.state = {
            text: props.text,
            isDirty: false,
        };

        this.handleKeyPress = (ev: any) => {
            if (ev.key === "Enter") {
                ev.preventDefault();
                this.submit();
            }
        };
    }

    handleOnCommentChange = (event: any) => {
        this.setState({
            text: event.target.value,
            isDirty: true,
        });
    }

    submit() {
        this.props.handleSubmit(this.state.text);
    }

    render() {
        const { open, handleClose, message, title, submitButtonName, multiline, handleSubmit } = this.props;
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent
                    style={{ minWidth: "400px" }}
                >
                    {message &&
                        <DialogContentText>
                            {message}
                        </DialogContentText>
                    }
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="comment"
                        multiline={multiline}
                        rows={5}
                        rowsMax={10}
                        type="text"
                        fullWidth={true}
                        onChange={this.handleOnCommentChange}
                        value={this.state.text}
                        onKeyPress={this.handleKeyPress}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        style={{ color: grey[500] }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleSubmit(this.state.text)}
                        variant="flat"
                        style={{ color: green[500] }}
                        disabled={!this.state.isDirty}
                    >
                        {submitButtonName ? submitButtonName : "Submit"}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}