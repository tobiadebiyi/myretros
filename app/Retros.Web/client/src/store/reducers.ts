import { combineReducers } from "redux";
import { RetroReducer } from "../modules/retro";
import { RetroListReducer } from "../modules/retroList";

export const RetroReducers = combineReducers({
  retroState: RetroReducer,
  retroListState: RetroListReducer,
});