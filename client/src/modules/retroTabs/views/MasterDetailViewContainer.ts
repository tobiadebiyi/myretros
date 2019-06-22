import { connect } from "./node_modules/react-redux";
import { ApplicationState } from "../../../store";
import DetailedView, { MasterDetailViewProps } from "../../views/MasterDetail";
import { RetroActionCreators } from "../state";
import { showSnackBar } from "./node_modules/src/modules/app";

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