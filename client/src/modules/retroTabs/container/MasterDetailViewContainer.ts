import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import DetailedView, { MasterDetailViewProps } from "../views/MasterDetailView";
import { RetroActionCreators } from "../state";
import { showSnackBar } from "src/modules/app";

const mapStateToProps = (state: ApplicationState): Partial<MasterDetailViewProps> => {
  return {
    retro: state.retroState.retro,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    joinRetro: (retroId: string) => dispatch(RetroActionCreators.joinRetro(retroId)),
    showSnackBar: (message: string) => showSnackBar(dispatch, message),
  };
};

export const MasterDetailViewContainer = connect(
  mapStateToProps, mapDispatchToProps
)(DetailedView);