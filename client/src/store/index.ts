import { RetroState } from "../modules/retro";
import { RetroListState } from "../modules/retroList";

export { store } from "./createStore";

export interface ApplicationState {
  retroState: RetroState;
  retroListState: RetroListState;
}