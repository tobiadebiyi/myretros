import * as React from "react";

import {
    TableRow,
    TableCell,
    Typography,
    Tooltip,
    Button
} from "@material-ui/core";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { Delete, Copyright } from "@material-ui/icons/";

interface RetroRowProps {
    id: string;
    name: string;
    gotoRetro: (retroId: string) => void;
    showSnackBar: (test: string) => void;
    deleteRetro: (retroId: string) => void;
}

export const RetroRow: React.SFC<RetroRowProps> = (props) => {
    const { id, name, gotoRetro, showSnackBar, deleteRetro } = props;
    const handleOnDelete = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        deleteRetro(id);
    };

    return (
        <TableRow hover={true} onClick={() => gotoRetro(id!)}>
            <TableCell >
                <Typography>
                    {name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {id}
                </Typography>
            </TableCell>
            <TableCell>
                <Tooltip title="Copy reference">
                    <Button onClick={(e) => e.stopPropagation()}>
                        <CopyToClipboard
                            text={id}
                            onCopy={() => showSnackBar("Copied!")}
                        >
                            <Copyright />
                        </CopyToClipboard>
                    </Button>
                </Tooltip>
                <Tooltip title="delete retro">
                    <Button onClick={handleOnDelete}>
                        <Delete />
                    </Button>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};