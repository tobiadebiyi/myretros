import { Retro } from "../../retro";
import { RetroApi } from "../../../apis/retroApi";

export const SAVE_RETRO_STARTED: string = "SAVE_RETRO_STARTED";
export const SAVE_RETRO_FAILURE: string = "SAVE_RETRO_STARTED";
export const SAVE_RETRO_SUCCESS: string = "SAVE_RETRO_SUCCESS";

export const FETCH_RETROS_STARTED: string = "FETCH_RETROS_STARTED";
export const FETCH_RETROS_SUCCESS: string = "FETCH_RETROS_SUCCESS";

export const RetroListActionCreators = {
  fetchRetros: () => {
    return (dispatch: any) => {
      dispatch({ type: FETCH_RETROS_STARTED });
      RetroApi.getRetros().then(response => dispatch({ type: FETCH_RETROS_SUCCESS, retros: response.value }));
    };
  },
  saveRetro: (retro: Retro) => {
    return (dispatch: any) => {
      // tslint:disable-next-line:no-console
      console.log(retro);
    };
  },
};

export interface RetroListState {
  retros: Retro[];
  isfetchingRetros: boolean;
}

const getInitialState = (): RetroListState => ({
  retros: [],
  isfetchingRetros: false,
});

export const RetroListReducer = (state: RetroListState = getInitialState(), action: any) => {
  switch (action.type) {
    case FETCH_RETROS_STARTED:
      return { ...state, isfetchingRetros: true };
    case FETCH_RETROS_SUCCESS:
      return { ...state, isfetchingRetros: false, retros: action.retros };
    default:
      return state;
  }
};
