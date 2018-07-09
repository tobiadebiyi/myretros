import { Grid, Table, TableBody, TableRow, TableCell, Typography } from "material-ui";
import * as React from "react";
import { Retro } from "../../retro";
import * as styles from "./styles.css";

export interface RetroListProps {
  retros: Retro[];
  classes?: any;
  handleOnCreateRetro: (retroName: string) => void;
  showRetro: (retroId: string) => void;
  fetchRetros: () => void;
}

export class RetroList extends React.Component<RetroListProps> {
  constructor(props: RetroListProps, context?: any) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchRetros();
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