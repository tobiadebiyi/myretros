import { HubConnectionBuilder } from "../../node_modules/@aspnet/signalr";
import config from "../config";
import {
    RetroActionCreators,
    Retro,
    GroupCommentModel,
    Group,
    UPDATE_GROUP
} from "../modules/retro";
import { showSnackBar } from "src/modules/app";

const hubConnection = new HubConnectionBuilder()
    .withUrl(`${config.apiUrl}/retrohub`)
    .build();

export enum SignalRActions {
    JOIN_RETRO = "SIGNALR_JOIN_RETRO",
    SAVE_COMMENT = "SIGNALR_SAVE_COMMENT",
    TOGGLE_GROUP_VISIBILITY = "SIGNALR_TOGGLE_GROUP_VISIBILITY",
}

export function signalR(store: any) {
    return (next: any) => async (action: any) => {
        switch (action.type) {
            case SignalRActions.JOIN_RETRO:
                hubConnection.invoke("JoinRetro", action.retroId);
                break;
            case SignalRActions.SAVE_COMMENT:
                if (action.payload.comment.id) {
                    hubConnection.invoke("UpdateComment", action.payload);
                } else {
                    hubConnection.invoke("AddComment", action.payload);
                }
                break;
            case SignalRActions.TOGGLE_GROUP_VISIBILITY:
                hubConnection.invoke("ToggleRetroGroupVisibility", action.payload);
                break;
            default:
                break;
        }
        return next(action);
    };
}

export function startSignalR(store: any, callback: any) {
    hubConnection.on("ReceiveRetro", (retro: Retro) => {
        store.dispatch(RetroActionCreators.updateRetro(retro));
    });

    hubConnection.on("FailedToJoinRetro", (reason: string) => {
        showSnackBar(store.dispatch, reason);
    });

    hubConnection.on("CommentAdded", (response: GroupCommentModel) => {
        store.dispatch(RetroActionCreators.addCommentToRetro(response));
    });

    hubConnection.on("CommentUpdated", (response: GroupCommentModel) => {
        store.dispatch(RetroActionCreators.addCommentToRetro(response));
    });

    hubConnection.on("GroupVisibilityChanged", (response: Group) => {
        store.dispatch({ type: UPDATE_GROUP, payload: response });
    });

    hubConnection.start().then(callback);
}