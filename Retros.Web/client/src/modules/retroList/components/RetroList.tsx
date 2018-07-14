import { Grid, Table, TableBody, TableRow, TableCell, Typography } from "material-ui";
import * as React from "react";
import { Retro } from "../../retro";
import * as styles from "./styles.css";
import { HubConnectionBuilder, HubConnection } from "@aspnet/signalr";

export interface RetroListProps {
  retros: Retro[];
  classes?: any;
  handleOnCreateRetro: (retroName: string) => void;
  showRetro: (retroId: string) => void;
  fetchRetros: () => void;
}

export class RetroList extends React.Component<RetroListProps> {
  hubConnection: HubConnection;
  constructor(props: RetroListProps, context?: any) {
    super(props);

    this.hubConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:50880/retrohub")
    .build();
  }

  componentDidMount() {
    this.props.fetchRetros();

    this.hubConnection.on("Connected", (message: string) => {
      alert(message);
    });

    this.hubConnection.start();
  }

  componentWillUnmount() {
    this.hubConnection.stop();
  }

  render() {
    const { retros, showRetro } = this.props;
    return (
      <div className={styles.root}>
        <Grid container={true} alignContent={"center"} justify={"center"}>
          <Grid item={true} xs={10}>
            <Grid
              container={true}
              direction={"row"}
              alignItems={"center"}
              justify={"flex-start"}
            >
              <Typography
                gutterBottom={true}
                variant="title"
              >
                Retro List
              </Typography>
              <Table>
                <TableBody>
                  {retros.map((retro, index) => (
                    <TableRow key={index} hover={true} onClick={() => showRetro(retro.id)}>
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