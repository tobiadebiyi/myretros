import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import DetailedView, { DetailedViewProps } from "../components/DetailedView";

const mapStateToProps = (state: ApplicationState): Partial<DetailedViewProps> => {
  return {
    retro: state.retroState.retro,
  };
};

export const DetailedViewContainer = connect(
  mapStateToProps,
)(DetailedView);