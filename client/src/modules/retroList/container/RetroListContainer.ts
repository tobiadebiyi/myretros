import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { RetroListProps, RetroList } from "../components";
import { RetroListActionCreators } from "..";
import { RouteComponentProps } from "react-router";
import { CreateRetro } from "../state";
import { Retro } from "../../retroTabs";

const mapStateToProps = (state: ApplicationState, ownProps): Partial<RetroListProps> => {
  return {
    retros: state.retroListState.retros,
  };
};

const mapDispatchToProps = (dispatch, ownProps: RouteComponentProps<{}>): Partial<RetroListProps> => {
  return {
    gotoRetro: (retroReference: string) => ownProps.history.push(`/retros/${retroReference}`),
    fetchRetros: () => dispatch(RetroListActionCreators.fetchRetros()),
    createRetro: (request: CreateRetro) => dispatch(RetroListActionCreators.createRetro(request)),
    deleteRetro: (retroId: string) => dispatch(RetroListActionCreators.deleteRetro(retroId)),
    updateRetros: (retros: Retro[]) => dispatch(RetroListActionCreators.updateRetros(retros)),
  };
};

export const RetroListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetroList);