import { RetroState } from "../modules/retroTabs";
import { RetroListState } from "../modules/retros";
import { AppState } from "../modules/app";

export { store } from "./createStore";

export interface ApplicationState {
  retroState: RetroState;
  retroListState: RetroListState;
  appState: AppState;
}