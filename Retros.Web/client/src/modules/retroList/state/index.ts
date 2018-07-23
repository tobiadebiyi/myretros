import { Retro } from "../../retro";
import { RetroApi } from "../../../apis/retroApi";

export const SAVE_RETRO_STARTED: string = "retolist/SAVE_RETRO_STARTED";
export const SAVE_RETRO_SUCCESS: string = "retolist/SAVE_RETRO_SUCCESS";

export const FETCH_RETROS_STARTED: string = "retolist/FETCH_RETROS_STARTED";
export const FETCH_RETROS_SUCCESS: string = "retolist/FETCH_RETROS_SUCCESS";

export const CREATE_RETRO_STARTED: string = "retolist/CREATE_RETRO_STARTED";
export const CREATE_RETRO_SUCCESS: string = "retolist/CREATE_RETRO_SUCCESS";

export const DELETE_RETRO_STARTED: string = "retolist/DELETE_RETRO_STARTED";
export const DELETE_RETRO_SUCCESS: string = "retolist/DELETE_RETRO_SUCCESS";
export const DELETE_RETRO_FAILURE: string = "retolist/DELETE_RETRO_FAILURE";

export const RetroListActionCreators = {
  fetchRetros: () => {
    return (dispatch: any) => {
      dispatch({ type: FETCH_RETROS_STARTED });
      RetroApi.getRetros()
        .then(retros => dispatch({ type: FETCH_RETROS_SUCCESS, retros }));
    };
  },
  createRetro: (request: CreateRetro) => {
    return (dispatch: any) => {
      dispatch({ type: CREATE_RETRO_STARTED });
      return RetroApi.createRetro(request)
        .then(retro => dispatch({ type: CREATE_RETRO_SUCCESS, retro }));
    };
  },
  deleteRetro: (retroId: string) => {
    return (dispatch: any) => {
      dispatch({ type: DELETE_RETRO_STARTED });
      return RetroApi.deleteRetro(retroId)
        .then(retro => dispatch({ type: DELETE_RETRO_SUCCESS, retro })).
        catch((reason: any) => {
          dispatch({ type: DELETE_RETRO_FAILURE });
          alert(reason);
        });
    };
  },
};

export interface RetroListState {
  retros: Retro[];
  isfetchingRetros: boolean;
  isCreatingRetro: boolean;
}

export interface CreateRetro {
  retroName: string;
  withDefaultGroups: boolean;
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
