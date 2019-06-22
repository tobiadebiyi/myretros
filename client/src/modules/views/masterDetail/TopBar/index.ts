import { connect } from "react-redux";
import { ApplicationState } from "src/store";
import TopBar, { TopBarProps } from "./TopBar";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: ApplicationState): Partial<TopBarProps> => {
    const { retro } = state.retroState;
    const { retros } = state.retroListState;
    const retrosMap = new Map();

    if (retros) retros.forEach(r => retrosMap.set(r.reference, r.name));

    return {
        isAdmin: retros && retro && retros.some(r => r.id === retro.id),
        retroReference: retro ? retro.reference : "",
        retros: retrosMap,
    };
};

const mapDispatchToProps = (__, ownProps: RouteComponentProps<{}>): Partial<TopBarProps> => {
    const { history: { push } } = ownProps;
    return {
        gotoRetro: (retroReference: string) => push(`/retros/${retroReference}`),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
