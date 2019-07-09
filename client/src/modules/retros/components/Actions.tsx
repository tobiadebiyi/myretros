import * as React from "react";
import { AddCircle, Group } from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import EditTextDialog, { EditTextDialogProps } from "src/components/EditTextDialog";

import { CreateRetro } from "../state";

export interface ActionsProps {
  createRetro: (request: CreateRetro) => Promise<void>;
  gotoRetro: (retroReference: string) => void;
  showSnackBar: (message: string) => void;
}

interface RetroListState {
  dialogProps?: EditTextDialogProps;
  snackBarMessage?: string;
  onSaveTextHandler?: (text: string) => void;
}

export default class Retros extends React.Component<ActionsProps,
  RetroListState> {
  handleOnSaveRetro: (retroName: string) => void;
  handleCloseDialog: () => void;
  handleJoinRetro: (retroId: string) => void;

  constructor(props: ActionsProps, context?: any) {
    super(props);

    this.state = {};

    this.handleOnSaveRetro = (retroName: string) => {
      this.props.createRetro({ retroName, withDefaultGroups: true })
        .then(() => this.props.showSnackBar("Retro Created"));

      this.setState({ dialogProps: undefined });
    };

    this.handleJoinRetro = (retroReference: string) => {
      this.props.gotoRetro(retroReference);
      this.setState({ dialogProps: undefined });
    };

    this.handleCloseDialog = () => {
      this.setState({ dialogProps: undefined });
    };
  }

  handleCreateRetroButtonClick() {
    this.setState({
      dialogProps: {
        open: true,
        text: "",
        name: "Name",
        handleOnSave: this.handleOnSaveRetro,
        handleClose: this.handleCloseDialog,
        submitButtonName: "Save"
      }
    });
  }

  handleJoinRetroButtonClick() {
    this.setState({
      dialogProps: {
        name: "Retro Ref#",
        handleOnSave: this.handleJoinRetro,
        text: "",
        handleClose: this.handleCloseDialog,
        open: true,
        submitButtonName: "Join"
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.dialogProps && <EditTextDialog {...this.state.dialogProps} />}
        <List>
          <ListSubheader inset={true}>Actions</ListSubheader>
          <ListItem button={true} onClick={() => this.handleCreateRetroButtonClick()}>
            <Tooltip title="Create Retro">
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Create Retro" />
          </ListItem>

          <ListItem button={true} onClick={() => this.handleJoinRetroButtonClick()}>
            <Tooltip title="Join Retro">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Join Retro" />
          </ListItem>
          <Divider />
        </List>
      </div>
    );
  }
}