import { EditHourState } from "./EditHourState";
import { ClockModel } from "./ClockModel";
import { ClockModeState } from "./ClockModeState";

export class DisplayTimeState implements ClockModeState {
  goToNextMode(watch: ClockModel): void {
    watch.setState(new EditHourState());
    console.log("Switching to Edit Hour mode");
  }

  increment(watch: ClockModel): void {}
}
