import * as React from "react";

export interface TabContainerProps {
    classes?: any;
    children: any;
}

export const TabContainer: React.SFC<TabContainerProps> = (props) => {
    return (
        <div style={{ padding: 8 * 3, height: "600px" }}>
            {props.children}
        </div>
    );
};