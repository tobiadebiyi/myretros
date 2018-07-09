import { applyMiddleware, createStore, Store } from "redux";
import { RetroReducers } from "./reducers";
import thunk from "redux-thunk";
import { ApplicationState } from ".";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(RetroReducers) as Store<ApplicationState>;