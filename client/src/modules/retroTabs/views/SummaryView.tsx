import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Toolbar from "@material-ui/core/Toolbar";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Retro } from "src/modules/retroTabs";
import { Group, Action, Comment } from "../state";
import grey from "@material-ui/core/colors/grey";
import Slide from "@material-ui/core/Slide";

const styles = () => createStyles({
    summaryHeaderRow: {
        background: grey[400],
    }
});

interface SummaryViewProps extends WithStyles<typeof styles> {
    retro: Retro;
}

export const SummaryView: React.SFC<SummaryViewProps> = (props) => {
    const mapActionsToCell = (actions: Action[]) => {
        return (
            <div>
                {actions.map((action, index) => (
                    <p key={index}>{action.text}</p>
                ))}
            </div>
        );
    };

    const mapCommentToRow = (groupName: string, comment: Comment, index: number) => (
        <TableRow key={index}>
            <TableCell>{groupName}</TableCell>
            <TableCell>{comment.text}</TableCell>
            <TableCell>{mapActionsToCell(comment.actions)}</TableCell>
        </TableRow>
    );

    const mapGroupsToCommentRows = (groups: Group[]) => {
        const rows: JSX.Element[] = [];

        groups.map((group) => {
            group.comments.map((comment) => {
                rows.push(mapCommentToRow(group.name, comment, rows.length++));
            });
        });

        return rows;
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Toolbar>
                <Typography variant="h6">Summary</Typography>
            </Toolbar>
            <Slide direction="right" in={true} mountOnEnter={true} unmountOnExit={true}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Group</TableCell>
                            <TableCell>Comment</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mapGroupsToCommentRows(props.retro.groups)}
                    </TableBody>
                </Table>
            </Slide>
        </div>
    );
};

export default withStyles(styles)(SummaryView);