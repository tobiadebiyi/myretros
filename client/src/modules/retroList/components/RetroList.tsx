import {
  Table,
  TableBody,
  Typography,
  Snackbar,
  SnackbarContent,
  Paper,
  Toolbar,
  Tooltip,
  IconButton,
  Avatar,
  LinearProgress
} from "@material-ui/core";

import { AddCircle, Group } from "@material-ui/icons";
import * as React from "react";
import { Retro } from "../../retroTabs";
import { EditTextDialog, EditTextDialogProps } from "../../../components/EditTextDialog";
import { RetroRow } from ".";
import { CreateRetro } from "..";
import { green, orange } from "@material-ui/core/colors";

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
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Snackbar open={this.state.showSnackBar} title={this.state.snackBarMessage}>
          <SnackbarContent message={this.state.snackBarMessage!} />
        </Snackbar>

        {this.state.dialogProps && <EditTextDialog {...this.state.dialogProps} />}

        <Paper style={{ width: "800px", minHeight: "600px" }}>
          <Toolbar style={{ flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
            <Typography
              style={{ flex: 10, marginTop: "20px" }}
              gutterBottom={true}
              variant="display2"
            >
              Retros
            </Typography>
            <Tooltip title="Create Retro">
              <IconButton
                onClick={() => this.handleCreateRetroButtonClick({ name: "", id: "", groups: [] })}
                aria-label="Create Retro"
              >
                <Avatar style={{ backgroundColor: green[500] }}>
                  <AddCircle />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Join a Retro">
              <IconButton
                onClick={() => this.handleJoinRetroButtonClick()}
                aria-label="Join Retro"
                color="primary"
              >
                <Avatar style={{ backgroundColor: orange[500] }}>
                  <Group />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
          {retros.length > 0 ?
            <Table>
              <TableBody>
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
              </TableBody>
            </Table>
            :
            <Typography variant="body1" color="secondary" style={{ margin: "200px", textAlign: "center" }}>
              Please create or join a retro
            </Typography>
          }
        </Paper>
      </div >
    );
  }
}