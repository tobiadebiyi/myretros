import * as React from "react";
import { Typography, Table, TableHead, TableCell, Toolbar, TableRow } from "@material-ui/core";
import { Retro } from "src/modules/retroTabs";

export const Summary: React.SFC<{ retro: Retro }> = (props) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Toolbar>
                <Typography variant="title">Summary</Typography>
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Group</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </div>
    );
};