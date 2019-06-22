import { connect } from "react-redux";
import CommentGroup from "./CommentGroup";
import { SignalRActions } from "src/store/signalR";

const mapDispatchToProps = (dispatch) => ({
    toggleGroupVisibility: (retroId, groupId) => dispatch({
        type: SignalRActions.TOGGLE_GROUP_VISIBILITY,
        payload: { retroId, groupId },
    }),
});

export default connect(null, mapDispatchToProps)(CommentGroup);