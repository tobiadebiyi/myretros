import * as React from "react";
import { AddCircle, Group } from "@material-ui/icons";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import EditTextDialog, { EditTextDialogProps } from "src/components/EditTextDialog";

import { Retro } from "../../retroTabs";
import { RetroRow } from "./RetroRow";
import { CreateRetro } from "../state";

export interface RetroListProps {
  retros: Retro[];
  classes?: any;
  createRetro: (request: CreateRetro) => Promise<void>;
  gotoRetro: (retroReference: string) => void;
  fetchRetros: () => void;
  deleteRetro: (retroId: string) => Promise<void>;
  updateRetros: (retros: Retro[]) => void;
  showSnackBar: (message: string) => void;
}

interface RetroListState {
  dialogProps?: EditTextDialogProps;
  activeRetro?: Retro;
  snackBarMessage?: string;
  onSaveTextHandler?: (text: string) => void;
}

export class RetroList extends React.Component<RetroListProps,
  RetroListState> {
  handleOnSaveRetro: (retroName: string) => void;
  handleDeleteRetro: (retroId: string) => void;
  handleCloseDialog: () => void;
  handleJoinRetro: (retroId: string) => void;
  handleReceivedRetros: (retros: Retro[]) => void;

  constructor(props: RetroListProps, context?: any) {
    super(props);

    this.state = {};

    this.handleOnSaveRetro = (retroName: string) => {
      this.props.createRetro({ retroName, withDefaultGroups: true })
        .then(() => this.props.showSnackBar("Retro Created"));

      this.setState({ dialogProps: undefined, activeRetro: undefined });
    };

    this.handleDeleteRetro = (retroId: string) => {
      this.props.deleteRetro(retroId).then(() => {
        this.props.showSnackBar("Retro Deleted");
        this
          .props
          .fetchRetros();
      });
    };

    this.handleJoinRetro = (retroReference: string) => {
      this.props.gotoRetro(retroReference);
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
    const { retros, gotoRetro } = this.props;
    if (!retros) return <LinearProgress color="secondary" />;
    const defaultRetro = { name: "", id: "", groups: [], reference: "" };

    return (
      <div>
        {this.state.dialogProps && <EditTextDialog {...this.state.dialogProps} />}
        <List>
          <ListSubheader inset={true}>Actions</ListSubheader>
          <ListItem button={true} onClick={() => this.handleCreateRetroButtonClick(defaultRetro)}>
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
          {
            retros.map((retro, index) => (
              <RetroRow
                key={index}
                retroId={retro.id!}
                retroReference={retro.reference}
                name={retro.name}
                gotoRetro={gotoRetro}
                showSnackBar={this.props.showSnackBar}
                deleteRetro={this.handleDeleteRetro}
              />))
          }
        </List>
      </div >
    );
  }
}