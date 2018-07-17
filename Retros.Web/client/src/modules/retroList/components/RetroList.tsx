import { Grid, Table, TableBody, TableRow, TableCell, Typography, Button } from "material-ui";
import * as React from "react";
import { Retro } from "../../retro";
import * as styles from "./styles.css";
import { EditTextDialog } from "../../../components/EditTextDialog";

export interface RetroListProps {
  retros: Retro[];
  classes?: any;
  createRetro: (retroName: string) => void;
  gotoRetro: (retroId: string) => void;
  fetchRetros: () => void;
}

interface RetroListState {
  showNewRetroDialog: boolean;
  activeRetro?: Retro;
}

export class RetroList extends React.Component<RetroListProps, RetroListState> {
  handleOnSaveRetro: (retroName: string) => void;
  constructor(props: RetroListProps, context?: any) {
    super(props);

    this.state = {
      showNewRetroDialog: false,
    };

    this.handleOnSaveRetro = (retroName: string) => {
      this.props.createRetro(retroName);
  
      this.setState({
        showNewRetroDialog: false, 
        activeRetro: undefined,
      });
    };
  }

  componentDidMount() {
    this.props.fetchRetros();
  }

  handleCreateRetroButtonClick(retro: Retro) {
    this.setState({
      activeRetro: retro,
      showNewRetroDialog: true
    });
    return;
  }

  render() {
    const { retros, gotoRetro } = this.props;
    return (
      <div className={styles.root}>
      {this.state.activeRetro &&
        <EditTextDialog 
          open={this.state.showNewRetroDialog} 
          handleClose={() => this.setState({showNewRetroDialog: false})}
          handleSave={this.handleOnSaveRetro}
          text={this.state.activeRetro!.name}
          title={this.state.activeRetro.id ? "Edit Retro" : "Create Retro"}
          message={"Retro Name"}
        />
      }

        <Grid container={true} alignContent={"center"} justify={"center"}>
          <Grid item={true} xs={10}>
            <Grid
              container={true}
              direction={"column"}
              alignItems={"center"}
              justify={"flex-start"}
            >
            <Button 
              onClick={() => this.handleCreateRetroButtonClick({name: "", id: "", groups: [], })}
              variant={"flat"}
              style={{alignSelf: "flex-end", backgroundColor: "grey"}}
            >
              Add Retro
            </Button>
              <Typography
                style={{alignSelf: "flex-start", marginBottom: "50px"}}
                gutterBottom={true}
                variant="title"
              >
                My Retros
              </Typography>
              <Table>
                <TableBody>
                  {retros.map((retro, index) => (
                    <TableRow key={index} hover={true} onClick={() => gotoRetro(retro.id!)}>
                      <TableCell>
                        {retro.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}