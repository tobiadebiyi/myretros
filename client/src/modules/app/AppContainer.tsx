import { connect } from "react-redux";
import App, { AppProps } from "./components/app/App";
import { ApplicationState } from "../../store";

const mapStateToProps = (state: ApplicationState): Partial<AppProps> => {
    return {
        isLoading: state.appState.isLoading,
    };
};

export const AppContainer = connect(
    mapStateToProps
  )(App);