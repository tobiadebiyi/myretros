import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import MasterDetail, { MasterDetailViewProps } from "./MasterDetail";
import { RetroActionCreators } from "../retro/state";
import { showSnackBar } from "src/modules/app";

const mapStateToProps = (state: ApplicationState): Partial<MasterDetailViewProps> => {
  return {
    retro: state.retroState.retro,
    isLoading: state.appState.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    joinRetro: (retroId: string) => dispatch(RetroActionCreators.joinRetro(retroId)),
    showSnackBar: (message: string) => showSnackBar(dispatch, message),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterDetail);