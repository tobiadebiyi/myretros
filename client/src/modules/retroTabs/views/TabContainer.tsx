import * as React from "react";
import {
    Typography,
} from "@material-ui/core";

export interface TabContainerProps {
    classes?: any;
    children: any;
}

export const TabContainer: React.SFC<TabContainerProps> = (props) => {
    return (
        <Typography component="div" style={{ padding: 8 * 3, height: "600px" }}>
            {props.children}
        </Typography>
    );
};