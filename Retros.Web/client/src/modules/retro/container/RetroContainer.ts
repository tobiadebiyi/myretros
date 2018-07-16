import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import RetroTabs, { RetroTabsProps } from "../components/RetroTabs";
import { RetroActionCreators, Comment, Retro } from "../state";
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
    addCommentToRetro: (comment: Comment, groupId: string) => 
      dispatch(RetroActionCreators.addCommentToRetro(comment, groupId)),
    updateRetro: (retro: Retro) => dispatch(RetroActionCreators.updateRetro(retro), )
  };
};

export const RetroContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetroTabs);