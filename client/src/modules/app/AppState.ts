export interface AppState {
  isLoading: boolean;
  snackBar?: { message: string };
}

const initialState: AppState = {
  isLoading: false,
};

const SNACKBAR_START = "app/SNACKBAR_START";
const SNACKBAR_END = "app/SNACKBAR_END";

export const AppReducer = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case SNACKBAR_START:
      return { ...state, snackBar: action.payload };
    case SNACKBAR_END:
      return { ...state, snackBar: null };
    default:
      return state;
  }
};

export const showSnackBar = (dispatch: any, message: string) => {
  dispatch({ type: SNACKBAR_START, payload: { message } })
    .then(() => setTimeout(() => { dispatch({ type: SNACKBAR_END }); }, 5000));
};