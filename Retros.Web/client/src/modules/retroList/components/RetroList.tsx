import {
  Table,
  TableBody,
  Typography,
  Snackbar,
  SnackbarContent,
  Paper,
  Toolbar,
  Tooltip,
  IconButton
} from "material-ui";

import { AddCircle } from "@material-ui/icons";
import * as React from "react";
import { Retro } from "../../retro";
import * as styles from "./styles.css";
import { EditTextDialog } from "../../../components/EditTextDialog";
import { RetroRow } from ".";
import { CreateRetro } from "..";

export interface RetroListProps {
  retros: Retro[];
  classes?: any;
  createRetro: (request: CreateRetro) => Promise<void>;
  gotoRetro: (retroId: string) => void;
  fetchRetros: () => void;
  deleteRetro: (retroId: string) => Promise<void>;
}

interface RetroListState {
  showNewRetroDialog: boolean;
  activeRetro?: Retro;
  showSnackBar: boolean;
  snackBarMessage?: string;
}

export class RetroList extends React.Component<RetroListProps,
  RetroListState> {
  handleOnSaveRetro: (retroName: string) => void;
  handleDeleteRetro: (retroId: string) => void;
  showSnackBar: (message: string) => void;

  constructor(props: RetroListProps, context?: any) {
    super(props);

    this.state = {
      showNewRetroDialog: false,
      showSnackBar: false
    };

    this.showSnackBar = (message: string) => {
      this.setState({ showSnackBar: true, snackBarMessage: message });
      setInterval(() => this.setState({ showSnackBar: false }), 3000);
    };

    this.handleOnSaveRetro = (retroName: string) => {
      this.props.createRetro({ retroName, withDefaultGroups: true })
        .then(() => this.showSnackBar("Retro Created"));

      this.setState({ showNewRetroDialog: false, activeRetro: undefined });
    };

    this.handleDeleteRetro = (retroId: string) => {
      this.props.deleteRetro(retroId).
        then(() => {
          this.showSnackBar("Retro Deleted");
          this.props.fetchRetros();
        });
    };
  }

  componentDidMount() {
    this
      .props
      .fetchRetros();
  }

  handleCreateRetroButtonClick(retro: Retro) {
    this.setState({ activeRetro: retro, showNewRetroDialog: true });
    return;
  }

  handleCopyReference(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
  }

  render() {
    const { retros, gotoRetro } = this.props;
    return (
      <div className={styles.root}>
        <Snackbar open={this.state.showSnackBar} title={this.state.snackBarMessage}>
          <SnackbarContent message={this.state.snackBarMessage!} />
        </Snackbar>

        {this.state.activeRetro && <EditTextDialog
          open={this.state.showNewRetroDialog}
          handleClose={() => this.setState({ showNewRetroDialog: false })}
          handleSave={this.handleOnSaveRetro}
          text={this.state.activeRetro.name}
          title={this.state.activeRetro.id
            ? "Edit Retro"
            : "Create Retro"}
          message={"Retro Name"}
        />
        }
        <Paper style={{ width: "800px" }}>
          <Toolbar style={{ flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
            <Typography
              style={{ flex: 1, marginTop: "20px" }}
              gutterBottom={true}
              variant="display2"
            >
              My Retros
            </Typography>
            <Tooltip title="Create Retro">
              <IconButton
                onClick={() => this.handleCreateRetroButtonClick({ name: "", id: "", groups: [], })}
                aria-label="Create Retro"
                style={{ backgroundColor: "grey" }}
              >
                <AddCircle />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Table>
            <TableBody>
              {retros.map((retro, index) => (
                <RetroRow
                  key={index}
                  id={retro.id!}
                  name={retro.name}
                  gotoRetro={gotoRetro}
                  showSnackBar={this.showSnackBar}
                  deleteRetro={this.handleDeleteRetro}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}