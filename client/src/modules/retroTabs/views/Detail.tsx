import * as React from "react";
import SummaryView from "./SummaryView";
import { RetroTabsContainer } from "../container";
import ListTwoTone from "@material-ui/icons/ListTwoTone";
import Tab from "@material-ui/icons/Tab";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import { Retro } from "../state";
import { ViewType } from "./ViewType";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => createStyles({
    viewToggleContainer: {
        height: 56,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        margin: `${theme.spacing.unit}px 0`,
        background: theme.palette.background.default,
    },
    centeredContent: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    chartContainer: {
        marginLeft: -22,
    },
});

interface DetailProps extends WithStyles<typeof styles> {
    retro: Retro;
    view: ViewType;
    handleAlignment: (__: any, view: ViewType) => void;
    match: any;
}

const Detail: React.SFC<DetailProps> = ({ classes, retro, view, handleAlignment, match }) => {
    const showTabView = retro && view === ViewType.Tab;
    const showSummaryView = retro && view === ViewType.Summary;

    if (!retro) {
        return (
            <div className={classes.centeredContent}>
                <Typography variant="overline">Please create or join a retro</Typography>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className={classes.viewToggleContainer}>
                <ToggleButtonGroup value={view} exclusive={true} onChange={handleAlignment}>
                    <ToggleButton value={ViewType.Tab}>
                        <Tooltip title={"Tab view"}>
                            <Tab />
                        </Tooltip>
                    </ToggleButton>

                    <ToggleButton value={ViewType.Summary}>
                        <Tooltip title={"Summary view"}>
                            <ListTwoTone />
                        </Tooltip>
                    </ToggleButton>

                </ToggleButtonGroup>
            </div>
            <div className={classes.chartContainer}>
                {showTabView && < RetroTabsContainer match={match} />}
                {showSummaryView && <SummaryView retro={retro} />}
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(Detail);
