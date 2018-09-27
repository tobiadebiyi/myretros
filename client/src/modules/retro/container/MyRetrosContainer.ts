import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { MyRetros, MyRetrosProps } from "../components";

const mapStateToProps = (
  state: ApplicationState): Partial<MyRetrosProps> => {
  return {
    isLoading: state.appState.isLoading,
  };
};

export const MyRetrosContainer = connect(
  mapStateToProps
)(MyRetros);