import { RetroApi } from "../../../apis/retroApi";

export const FETCH_COMMENTS_START: string = "FETCH_COMMENTS_START";
export const FETCH_COMMENTS_SUCCESS: string = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE: string = "FETCH_COMMENTS_FAILURE";

export const SAVE_COMMENT_STARTED: string = "SAVE_COMMENT_STARTED";
export const SAVE_COMMENT_SUCCESS: string = "SAVE_COMMENT_SUCCESS";

export const FETCH_RETRO_START: string = "FETCH_RETRO_START";
export const FETCH_RETRO_SUCCESS: string = "FETCH_RETRO_SUCCESS";
export const FETCH_RETRO_FAILURE: string = "FETCH_RETRO_FAILURE";

export const RetroActionCreators = {
  saveComment: (comment: Comment, groupId: string) => {
    return (dispatch: any) => {
      dispatch({ type: SAVE_COMMENT_STARTED });
      if (!comment.id) {
        comment.id = `newCommentId-${Math.random()}`;
      }

      dispatch({ type: SAVE_COMMENT_SUCCESS, comment, groupId });
    };
  },
  fetchRetro: (retroId: string) => {
    return (dispatch: any) => {
      dispatch({ type: FETCH_RETRO_START });
      RetroApi.getRetro(retroId).then((retro => dispatch({ type: FETCH_RETRO_SUCCESS, retro })));
    };
  },
};

export interface RetroState {
  retro?: Retro;
  isFetchingRetro: boolean;
}

export interface Retro {
  id: string;
  groups: CommentGroup[];
  name: string;
}

export interface CommentGroup {
  id: string;
  name: string;
  comments: Comment[];
}

export interface Comment {
  id?: string;
  isActiveUser: boolean;
  text: string;
  tagId?: string;
}

const initialState: RetroState = {
  isFetchingRetro: false,
};

export const RetroReducer = (state: RetroState = initialState, action: any) => {
  switch (action.type) {
    case SAVE_COMMENT_SUCCESS:
      const retro = state.retro;
      // const existingCommentIndex = retro!.comments.findIndex(c => c.id === action.comment.id);

      // if (existingCommentIndex === -1) {
      //   retro!.comments.push(action.comment);
      //   retro!.groups.find(g => g.id === action.groupId)!.commentIds.push(action.comment.id);
      // } else {
      //   retro!.comments[existingCommentIndex] = action.comment;
      // }

      return { ...state, retro };
    case FETCH_RETRO_SUCCESS:
      return { ...state, retro: action.retro };
    default:
      return state;
  }
};
