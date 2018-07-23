
import * as React from "react";

import {
    TableRow,
    TableCell,
    Typography,
    Tooltip,
    IconButton
} from "material-ui";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { ContentCopy, Delete } from "@material-ui/icons";

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
                    <IconButton onClick={(e) => e.stopPropagation()}>
                        <CopyToClipboard
                            text={id}
                            onCopy={() => showSnackBar("Copied!")}
                        >
                            <ContentCopy />
                        </CopyToClipboard>
                    </IconButton>
                </Tooltip>
                <Tooltip title="delete retro">
                    <IconButton onClick={handleOnDelete}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};