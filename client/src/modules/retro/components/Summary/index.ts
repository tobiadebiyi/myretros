import { connect } from "react-redux";
import { ApplicationState } from "src/store";
import { SummaryView } from "./Summary";

export default connect((state: ApplicationState) => ({ retro: state.retroState.retro }))(SummaryView);