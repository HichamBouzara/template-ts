import { WatchModel } from "./WatchModel";

export interface WatchModeState {
  goToNextMode(watch: WatchModel): void;
  increment(watch: WatchModel): void;
}
