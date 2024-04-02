import { DisplayTimeState } from "./DisplayTimeState";
import { ClockModel } from "./ClockModel";
import { ClockModeState } from "./ClockModeState";

export class EditMinuteState implements ClockModeState {
  goToNextMode(watch: ClockModel): void {
    watch.setState(new DisplayTimeState());
    console.log("Switching to Display Time mode");
  }

  increment(watch: ClockModel): void {
    let newMinute = watch.getCurrentTime().getMinutes() + 1;
    watch.setCurrentTime(
      new Date(watch.getCurrentTime().setMinutes(newMinute))
    );
  }
}
