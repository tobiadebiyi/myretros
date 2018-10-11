import * as React from "react";

import {
    TableRow,
    TableCell,
    Typography,
    Menu,
    MenuItem,
    MenuList,
    IconButton
} from "@material-ui/core";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { MoreVert } from "@material-ui/icons/";

interface RetroRowProps {
    retroId: string;
    name: string;
    gotoRetro: (retroId: string) => void;
    showSnackBar: (test: string) => void;
    deleteRetro: (retroId: string) => void;
}

interface RetroRowState {
    anchorEl: HTMLElement | null;
    open: boolean;
}

export class RetroRow extends React.Component<RetroRowProps, RetroRowState> {
    ITEM_HEIGHT: number = 48;

    constructor(props: RetroRowProps) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false,
        };
    }

    handleOpenMenu = event => {
        event.stopPropagation();
        this.setState({ anchorEl: event.currentTarget, open: true });
    }

    handleCloseMenu = () => {
        this.setState({ anchorEl: null, open: false });
    }

    handleCopy = () => {
        this.setState(
            { open: false },
            () => this.props.showSnackBar("Copied")
        );
    }

    handleDelete = () => {
        this.props.deleteRetro(this.props.retroId);
        this.setState(
            { open: false },
            () => this.props.showSnackBar("Retro delete")
        );
    }

    render() {
        const { retroId, name, gotoRetro } = this.props;
        const { anchorEl, open } = this.state;

        return (
            <TableRow hover={true} onClick={() => gotoRetro(retroId!)}>
                <TableCell >
                    <Typography>
                        {name}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>
                        {retroId}
                    </Typography>
                </TableCell>
                <TableCell style={{textAlign: "right"}} >
                    <IconButton
                        aria-label="More"
                        aria-owns={open ? "long-menu" : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpenMenu}
                    >
                        <MoreVert />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleCloseMenu}
                        PaperProps={{
                            style: {
                                maxHeight: this.ITEM_HEIGHT * 4.5,
                                width: 200,
                            },
                        }}
                    >
                        <MenuList onClick={(e) => e.stopPropagation()} >
                            <CopyToClipboard text={retroId} onCopy={this.handleCopy} >
                                <MenuItem >
                                    Copy Reference
                                </MenuItem>
                            </CopyToClipboard>
                            <MenuItem onClick={this.handleDelete}>
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </TableCell>
            </TableRow >
        );
    }
}