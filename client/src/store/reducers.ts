import { combineReducers } from "redux";
import { RetroReducer } from "../modules/retro";
import { RetroListReducer } from "../modules/retros";
import { AppReducer } from "../modules/app";

export const RetroReducers = combineReducers({
  retroState: RetroReducer,
  retroListState: RetroListReducer,
  appState: AppReducer,
});