import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import RetroTabs, { RetroTabsProps } from "../components/RetroTabs";
import { RetroActionCreators, GroupCommentModel } from "../state";
import { RouteComponentProps } from "react-router";

const mapStateToProps = (
  state: ApplicationState,
  ownProps: RouteComponentProps<{ retroId: string }>
): Partial<RetroTabsProps> => {
  return {
    retro: state.retroState.retro,
    retroId: ownProps.match.params.retroId,
  };
};

const mapDispatchToProps = (dispatch, ownProps): Partial<RetroTabsProps> => {
  return {
    joinRetro: (retroId: string) => dispatch(RetroActionCreators.joinRetro(retroId)),
    saveComment: (retroId: string, model: GroupCommentModel) =>
      dispatch(RetroActionCreators.saveComment(retroId, model))
  };
};

export const RetroContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetroTabs);