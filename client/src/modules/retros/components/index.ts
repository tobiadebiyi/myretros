import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import Retros, { RetroListProps } from "./Retros";
import { RetroListActionCreators } from "..";
import { RouteComponentProps } from "react-router";
import { CreateRetro } from "../state";
import { Retro } from "../../retro";
import { withRouter } from "react-router-dom";
import { showSnackBar } from "src/modules/app/AppState";

const mapStateToProps = (state: ApplicationState, ownProps): Partial<RetroListProps> => {
  return {
    retros: state.retroListState.retros,
  };
};

const mapDispatchToProps = (dispatch, ownProps: RouteComponentProps<{}>): Partial<RetroListProps> => {
  const { history: { push } } = ownProps;
  return {
    gotoRetro: (retroReference: string) => push(`/retros/${retroReference}`),
    fetchRetros: () => dispatch(RetroListActionCreators.fetchRetros()),
    createRetro: (request: CreateRetro) => dispatch(RetroListActionCreators.createRetro(request))
      .then((reference) => push(`/retros/${reference}`)),
    deleteRetro: (retroId: string) => dispatch(RetroListActionCreators.deleteRetro(retroId)),
    updateRetros: (retros: Retro[]) => dispatch(RetroListActionCreators.updateRetros(retros)),
    showSnackBar: (message: string) => showSnackBar(dispatch, message),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Retros));