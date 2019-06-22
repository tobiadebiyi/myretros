import { connect } from "react-redux";
import { ApplicationState } from "src/store";
import TabView, { RetroTabsProps } from "./Tabs";
import { RetroActionCreators, GroupCommentModel } from "../../state";
import { RouteComponentProps } from "react-router";

const mapStateToProps = (state: ApplicationState): Partial<RetroTabsProps> => {
  const retros = state.retroListState.retros;
  const retro = state.retroState.retro;
  return {
    retro: state.retroState.retro,
    isAdmin: retros && retro && retros.some(r => r.id === retro.id),
  };
};

const mapDispatchToProps = (dispatch, ownProps: RouteComponentProps<{}>): Partial<RetroTabsProps> => ({
  saveComment: (retroId: string, model: GroupCommentModel) =>
    dispatch(RetroActionCreators.saveComment(retroId, model)),
  gotoList: () => ownProps.history.push("/"),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabView);