import { HubConnectionBuilder } from "../../node_modules/@aspnet/signalr";
import { config } from "../config";
import { RetroActionCreators, Retro, GroupCommentModel } from "../modules/retro";

const hubConnection = new HubConnectionBuilder()
    .withUrl(`${config.apiUrl}/retrohub`)
    .build();

export enum SignalRActions {
    JOIN_RETRO = "SIGNALR_JOIN_RETRO",
    SAVE_COMMENT = "SIGNALR_SAVE_COMMENT",
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

    hubConnection.on("CommentAdded", (response: GroupCommentModel) => {
        store.dispatch(RetroActionCreators.addCommentToRetro(response));
    });
    hubConnection.on("CommentUpdated", (response: GroupCommentModel) => {
        store.dispatch(RetroActionCreators.addCommentToRetro(response));
    });

    hubConnection.start().then(callback);
}