import * as React from "react";
import {
    withStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    WithStyles,
} from "@material-ui/core";

import { Retro } from "../state";
import { MenuRounded } from "@material-ui/icons";

const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    grow: {
        flexGrow: 1,
    },
});

interface MyRetrosAppBarProps extends WithStyles<typeof styles> {
    gotoList: () => void;
    retro: Retro;
}

const MyRetrosAppBar: React.SFC<MyRetrosAppBarProps> = (props) => {
    const { classes, gotoList, retro } = props;
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuRounded onClick={gotoList} />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.grow}>
                    My Retros
                </Typography>
                <Typography
                    variant="subheading"
                    color="inherit"
                    className={classes.grow}
                    style={{ textAlign: "center" }}
                >
                    {retro.name}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles, {withTheme: true})(MyRetrosAppBar);