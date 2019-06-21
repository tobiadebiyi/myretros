import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { connect } from "react-redux";
import { ApplicationState } from "src/store";

const SnackBar = ({ snackBar }) => (
    <React.Fragment>
        {snackBar &&
            <Snackbar open={true} title={snackBar.message}>
                <SnackbarContent message={snackBar.message} />
            </Snackbar>
        }
    </React.Fragment>
);

export default connect((state: ApplicationState) => ({ snackBar: state.appState.snackBar }))(SnackBar);