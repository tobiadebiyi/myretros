import { connect } from "react-redux";
import Retros, { ActionsProps } from "./Actions";
import { RetroListActionCreators } from "..";
import { RouteComponentProps } from "react-router";
import { CreateRetro } from "../state";
import { withRouter } from "react-router-dom";
import { showSnackBar } from "src/modules/app/AppState";

const mapDispatchToProps = (dispatch, ownProps: RouteComponentProps<{}>): Partial<ActionsProps> => {
  const { history: { push } } = ownProps;
  return {
    gotoRetro: (retroReference: string) => push(`/retros/${retroReference}`),
    createRetro: (request: CreateRetro) =>
      dispatch(RetroListActionCreators.createRetro(request))
        .then((reference) => push(`/retros/${reference}`)),
    showSnackBar: (message: string) => showSnackBar(dispatch, message),
  };
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Retros));