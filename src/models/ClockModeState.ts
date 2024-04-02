import { ClockModel } from "./ClockModel";

export interface ClockModeState {
  goToNextMode(watch: ClockModel): void;
  increment(watch: ClockModel): void;
}
