import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { RetroListProps, RetroList } from "../components";
import { RetroListActionCreators } from "..";
import { RouteComponentProps } from "react-router";
import { CreateRetro } from "../state";

const mapStateToProps = (state: ApplicationState, ownProps): Partial<RetroListProps> => {
  return {
    retros: state.retroListState.retros,
  };
};

const mapDispatchToProps = (dispatch, ownProps: RouteComponentProps<{}>): Partial<RetroListProps> => {
  return {
    gotoRetro: (retroId: string) => ownProps.history.push(`/retro/${retroId}`),
    fetchRetros: () => dispatch(RetroListActionCreators.fetchRetros()),
    createRetro: (request: CreateRetro) => dispatch(RetroListActionCreators.createRetro(request)),
    deleteRetro: (retroId: string) => dispatch(RetroListActionCreators.deleteRetro(retroId)),
  };
};

export const RetroListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetroList);