import { EditMinuteState } from "./EditMinuteState";
import { ClockModel } from "./ClockModel";
import { ClockModeState } from "./ClockModeState";

export class EditHourState implements ClockModeState {
  goToNextMode(watch: ClockModel): void {
    watch.setState(new EditMinuteState());
    console.log("Switching to Edit Minute mode");
  }

  increment(watch: ClockModel): void {
    let newHour = watch.getCurrentTime().getHours() + 1;
    watch.setCurrentTime(new Date(watch.getCurrentTime().setHours(newHour)));
  }
}
