import { SignalRActions } from "../../../store/signalR";
import { ApplicationState } from "src/store";
import deepcopy from "deepcopy";

export const FETCH_COMMENTS_START: string = "FETCH_COMMENTS_START";
export const FETCH_COMMENTS_SUCCESS: string = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE: string = "FETCH_COMMENTS_FAILURE";

export const ADD_COMMENT_STARTED: string = "ADD_COMMENT_STARTED";
export const ADD_COMMENT_SUCCESS: string = "ADD_COMMENT_SUCCESS";

export const UPDATE_RETRO_START: string = "UPDATE_RETRO_START";
export const UPDATE_RETRO_SUCCESS: string = "UPDATE_RETRO_SUCCESS";

export const UPDATE_GROUP: string = "UPDATE_GROUP";

export const RetroActionCreators = {
  addCommentToRetro: (groupComment: GroupCommentModel) => {
    return (dispatch: any) => {
      dispatch({ type: ADD_COMMENT_STARTED });
      dispatch({ type: ADD_COMMENT_SUCCESS, payload: groupComment });
    };
  },
  updateRetro: (retro: Retro) => {
    return (dispatch: any) => {
      dispatch({ type: UPDATE_RETRO_START });
      dispatch({ type: UPDATE_RETRO_SUCCESS, retro });
    };
  },
  joinRetro: (retroId: string) => {
    return (dispatch: any) => {
      dispatch({ type: SignalRActions.JOIN_RETRO, retroId });
    };
  },
  saveComment: (retroId: string, model: GroupCommentModel) => {
    return (dispatch: any) => {
      dispatch({
        type: SignalRActions.SAVE_COMMENT,
        payload: {
          retroId,
          groupId: model.groupId,
          comment: model.comment
        }
      });
    };
  },
};

export interface RetroState {
  retro?: Retro;
  isFetchingRetro: boolean;
}

export interface Retro {
  id?: string;
  groups: Group[];
  name: string;
  reference: string;
}

export interface Group {
  id: string;
  name: string;
  comments: Comment[];
  tags: string[];
  commentsArePublic: boolean;
}

export interface Comment {
  id?: string;
  isOwner: boolean;
  text: string;
  tagId?: string;
  actions: Action[];
}

export interface Action {
  id?: string;
  commentId: string;
  text: string;
}

export interface GroupCommentModel {
  comment: Comment;
  groupId: string;
}

export interface GroupActionModel {
  retroId: string;
  groupId: string;
}

const initialState: RetroState = {
  isFetchingRetro: false,
};

export const RetroReducer = (state: RetroState = initialState, action: any) => {
  let groupIndex: number;
  let retro: Retro;

  switch (action.type) {
    case UPDATE_RETRO_SUCCESS:
      return { ...state, retro: action.retro };
    case ADD_COMMENT_SUCCESS:
      retro = deepcopy(state.retro);
      groupIndex = getGroupIndex(retro!.groups, action.payload.groupId);
      const comments = retro.groups[groupIndex].comments;
      const existingCommentIndex = comments.findIndex(c => c.id === action.payload.comment.id);

      if (existingCommentIndex === -1) {
        comments.push(action.payload.comment);
      } else {
        comments.splice(existingCommentIndex, 1, action.payload.comment);
      }

      return { ...state, retro };
    case UPDATE_GROUP:
      retro = deepcopy(state.retro);
      groupIndex = getGroupIndex(retro!.groups, action.payload.id);
      retro.groups[groupIndex] = action.payload;
      debugger;
      return { ...state, retro };
    default:
      return state;
  }
};

export const Selectors = {
  getGroup: (state: ApplicationState) => (groupId) => {
    return state.retroState.retro!.groups.find(g => g.id === groupId);
  },
};

function getGroupIndex(groups: Group[], groupId: string) {
  return groups.findIndex(g => g.id === groupId);
}
