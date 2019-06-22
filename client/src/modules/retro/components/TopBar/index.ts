import { connect } from "react-redux";
import { ApplicationState } from "src/store";
import TopBar from "./TopBar";

const mapStateToProps = (state: ApplicationState) => {
    const { retro } = state.retroState;
    const { retros } = state.retroListState;
    return {
        isAdmin: retros && retro && retros.some(r => r.id === retro.id),
        location: retro ? retro.name : undefined,
        retroReference: retro ? retro.reference : "",
    };
};

export default connect(mapStateToProps)(TopBar);
