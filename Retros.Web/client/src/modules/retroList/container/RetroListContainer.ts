import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { RetroListProps, RetroList } from "../components";
import { RetroListActionCreators } from "..";
import { RouteComponentProps } from "react-router";

const mapStateToProps = (state: ApplicationState, ownProps): Partial<RetroListProps> => {
  return {
    retros: state.retroListState.retros,
  };
};

const mapDispatchToProps = (dispatch, ownProps: RouteComponentProps<{ retroId: string }>): Partial<RetroListProps> => {
  return {
    showRetro: (retroId: string) => ownProps.history.push(`/retro/${retroId}`),
    fetchRetros: () => dispatch(RetroListActionCreators.fetchRetros()),
  };
};

export const RetroListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetroList);