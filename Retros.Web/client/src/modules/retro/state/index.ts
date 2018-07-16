export const FETCH_COMMENTS_START: string = "FETCH_COMMENTS_START";
export const FETCH_COMMENTS_SUCCESS: string = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE: string = "FETCH_COMMENTS_FAILURE";

export const ADD_COMMENT_STARTED: string = "ADD_COMMENT_STARTED";
export const ADD_COMMENT_SUCCESS: string = "ADD_COMMENT_SUCCESS";

export const UPDATE_RETRO_START: string = "UPDATE_RETRO_START";
export const UPDATE_RETRO_SUCCESS: string = "UPDATE_RETRO_SUCCESS";

export const RetroActionCreators = {
  addCommentToRetro: (comment: Comment, groupId: string) => {
    return (dispatch: any) => {
      dispatch({ type: ADD_COMMENT_STARTED });
      dispatch({ type: ADD_COMMENT_SUCCESS, comment, groupId });
    };
  },
  updateRetro: (retro: Retro) => {
    return (dispatch: any) => {
      dispatch({ type: UPDATE_RETRO_START });
      dispatch({ type: UPDATE_RETRO_SUCCESS, retro });
    };
  },
};

export interface RetroState {
  retro?: Retro;
  isFetchingRetro: boolean;
}

export interface Retro {
  id: string;
  groups: Group[];
  name: string;
}

export interface Group {
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
    case UPDATE_RETRO_SUCCESS:
      return { ...state, retro: action.retro };
    case ADD_COMMENT_SUCCESS:
      const retro = Object.assign({}, state.retro);
      var groupIndex = retro!.groups.findIndex(g => g.id === action.groupId);
      retro!.groups[groupIndex].comments.push(action.comment);
      return {...state, retro};
    default:
      return state;
  }
};
