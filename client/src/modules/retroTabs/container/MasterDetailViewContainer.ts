import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import DetailedView, { MasterDetailViewProps } from "../views/MasterDetailView";
import { RetroActionCreators } from "../state";

const mapStateToProps = (state: ApplicationState): Partial<MasterDetailViewProps> => {
  return {
    retro: state.retroState.retro,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    joinRetro: (retroId: string) => dispatch(RetroActionCreators.joinRetro(retroId)),
  };
};

export const MasterDetailViewContainer = connect(
  mapStateToProps, mapDispatchToProps
)(DetailedView);