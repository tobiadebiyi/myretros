import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import RetroTabs, { RetroTabsProps } from "../views/TabView";
import { RetroActionCreators, GroupCommentModel } from "../state";
import { RouteComponentProps } from "react-router";

const mapStateToProps = (
  state: ApplicationState,
  ownProps: RouteComponentProps<{ retroReference: string }>
): Partial<RetroTabsProps> => {
  return {
    retro: state.retroState.retro,
    retroReference: ownProps.match.params.retroReference,
  };
};

const mapDispatchToProps = (dispatch, ownProps: RouteComponentProps<{}>): Partial<RetroTabsProps> => {
  return {
    saveComment: (retroId: string, model: GroupCommentModel) =>
      dispatch(RetroActionCreators.saveComment(retroId, model)),
    gotoList: () => ownProps.history.push("/")
  };
};

export const RetroTabsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetroTabs);