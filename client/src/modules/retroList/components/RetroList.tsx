import {
  Snackbar,
  SnackbarContent,
  LinearProgress,
  List,
  ListSubheader,
  Divider,
  ListItem,
  ListItemIcon,
  Tooltip,
  ListItemText,
} from "@material-ui/core";

import { AddCircle, Group } from "@material-ui/icons";
import * as React from "react";
import { Retro } from "../../retroTabs";
import { EditTextDialog, EditTextDialogProps } from "../../../components/EditTextDialog";
import { RetroRow } from ".";
import { CreateRetro } from "..";

export interface RetroListProps {
  retros: Retro[];
  classes?: any;
  createRetro: (request: CreateRetro) => Promise<void>;
  gotoRetro: (retroId: string) => void;
  fetchRetros: () => void;
  deleteRetro: (retroId: string) => Promise<void>;
  updateRetros: (retros: Retro[]) => void;
}

interface RetroListState {
  dialogProps?: EditTextDialogProps;
  activeRetro?: Retro;
  showSnackBar: boolean;
  snackBarMessage?: string;
  onSaveTextHandler?: (text: string) => void;
}

export class RetroList extends React.Component<RetroListProps,
  RetroListState> {
  handleOnSaveRetro: (retroName: string) => void;
  handleDeleteRetro: (retroId: string) => void;
  showSnackBar: (message: string) => void;
  handleCloseDialog: () => void;
  handleJoinRetro: (retroId: string) => void;
  handleReceivedRetros: (retros: Retro[]) => void;

  constructor(props: RetroListProps, context?: any) {
    super(props);

    this.state = {
      showSnackBar: false
    };

    this.showSnackBar = (message: string) => {
      this.setState({ showSnackBar: true, snackBarMessage: message });
      setInterval(() => this.setState({ showSnackBar: false }), 3000);
    };

    this.handleOnSaveRetro = (retroName: string) => {
      this
        .props
        .createRetro({ retroName, withDefaultGroups: true })
        .then(() => this.showSnackBar("Retro Created"));

      this.setState({ dialogProps: undefined, activeRetro: undefined });
    };

    this.handleDeleteRetro = (retroId: string) => {
      this.props.deleteRetro(retroId).then(() => {
        this.showSnackBar("Retro Deleted");
        this
          .props
          .fetchRetros();
      });
    };

    this.handleJoinRetro = (retroId: string) => {
      this.props.gotoRetro(retroId);
      this.setState({ dialogProps: undefined, activeRetro: undefined });
    };

    this.handleCloseDialog = () => {
      this.setState({ dialogProps: undefined });
    };

    this.handleReceivedRetros = (retros: Retro[]) => {
      this.props.updateRetros(retros);
    };
  }

  componentDidMount() {
    this.props.fetchRetros();
  }

  handleCreateRetroButtonClick(retro: Retro) {
    this.setState({
      activeRetro: retro,
      dialogProps: {
        open: true,
        text: "",
        name: "Name",
        title: retro.id ? "Edit Retro" : "Create Retro",
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
        title: "Enter reference",
        handleOnSave: this.handleJoinRetro,
        text: "",
        handleClose: this.handleCloseDialog,
        open: true,
        submitButtonName: "Join"
      }
    });
  }

  render() {
    const { retros, gotoRetro } = this.props;

    if (!retros)
      return <LinearProgress color="secondary" />;

    return (
      <div>
        <Snackbar open={this.state.showSnackBar} title={this.state.snackBarMessage}>
          <SnackbarContent message={this.state.snackBarMessage!} />
        </Snackbar>

        {this.state.dialogProps && <EditTextDialog {...this.state.dialogProps} />}
        <List>
          <ListSubheader inset={true}>Actions</ListSubheader>

          <ListItem button={true} onClick={() => this.handleCreateRetroButtonClick({ name: "", id: "", groups: [] })}>
            <Tooltip title="Create Retro">
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
            </Tooltip>
            <ListItemText inset={false} primary="Create Retro" />
          </ListItem>

          <ListItem button={true}  onClick={() => this.handleJoinRetroButtonClick()}>
            <Tooltip title="Join Retro">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
            </Tooltip>
            <ListItemText inset={true} primary="Join Retro" />
          </ListItem>
          <Divider />
          {
            retros.map((retro, index) => (
              <RetroRow
                key={index}
                retroId={retro.id!}
                name={retro.name}
                gotoRetro={gotoRetro}
                showSnackBar={this.showSnackBar}
                deleteRetro={this.handleDeleteRetro}
              />))
          }
        </List>
      </div >
    );
  }
}