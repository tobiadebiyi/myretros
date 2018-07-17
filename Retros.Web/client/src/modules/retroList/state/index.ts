import { Retro } from "../../retro";
import { RetroApi } from "../../../apis/retroApi";

export const SAVE_RETRO_STARTED: string = "SAVE_RETRO_STARTED";
export const SAVE_RETRO_SUCCESS: string = "SAVE_RETRO_SUCCESS";

export const FETCH_RETROS_STARTED: string = "FETCH_RETROS_STARTED";
export const FETCH_RETROS_SUCCESS: string = "FETCH_RETROS_SUCCESS";

export const CREATE_RETRO_STARTED: string = "CREATE_RETRO_STARTED";
export const CREATE_RETRO_SUCCESS: string = "CREATE_RETRO_SUCCESS";

export const RetroListActionCreators = {
  fetchRetros: () => {
    return (dispatch: any) => {
      dispatch({ type: FETCH_RETROS_STARTED });
      RetroApi.getRetros()
        .then(retros => dispatch({ type: FETCH_RETROS_SUCCESS, retros }));
    };
  },
  createRetro: (retroName: string) => {
    return (dispatch: any) => {
      dispatch({type: CREATE_RETRO_STARTED});
      RetroApi.createRetro({retroName})
        .then(retro => dispatch({type: CREATE_RETRO_SUCCESS, retro}));
    };
  },
};

export interface RetroListState {
  retros: Retro[];
  isfetchingRetros: boolean;
  isCreatingRetro: boolean;
}

const getInitialState = (): RetroListState => ({
  retros: [],
  isfetchingRetros: false,
  isCreatingRetro: false,
});

export const RetroListReducer = (state: RetroListState = getInitialState(), action: any) => {
  switch (action.type) {
    case FETCH_RETROS_STARTED:
      return { ...state, isfetchingRetros: true };
    case FETCH_RETROS_SUCCESS:
      return { ...state, isfetchingRetros: false, retros: action.retros };
    case CREATE_RETRO_STARTED:
      return { ...state, isCreatingRetro: true };
    case CREATE_RETRO_SUCCESS:
      const retros = Object.assign([], state.retros);
      retros.push(action.retro);
      return { ...state, retros, isCreatingRetro: false };
    default:
      return state;
  }
};
