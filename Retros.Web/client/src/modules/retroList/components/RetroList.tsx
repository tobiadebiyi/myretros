import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Snackbar,
  SnackbarContent,
  Paper,
  Toolbar,
  Tooltip,
  IconButton
} from "material-ui";

import { AddCircle, ContentCopy } from "@material-ui/icons";

import * as React from "react";
import { Retro } from "../../retro";
import * as styles from "./styles.css";
import { EditTextDialog } from "../../../components/EditTextDialog";
import { CopyToClipboard } from "react-copy-to-clipboard";

export interface RetroListProps {
  retros: Retro[];
  classes?: any;
  createRetro: (retroName: string) => Promise<void>;
  gotoRetro: (retroId: string) => void;
  fetchRetros: () => void;
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
      this.props.createRetro(retroName)
        .then(() => this.showSnackBar("Retro Created"));

      this.setState({ showNewRetroDialog: false, activeRetro: undefined });
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
                <TableRow key={index} hover={true} onClick={() => gotoRetro(retro.id!)}>
                  <TableCell>
                    <Typography>
                      {retro.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {retro.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Copy reference">
                      <IconButton onClick={this.handleCopyReference}>
                        <CopyToClipboard
                          text={retro.id}
                          onCopy={() => this.showSnackBar("Copied")}
                        >
                          <ContentCopy />
                        </CopyToClipboard>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}