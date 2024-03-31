import { EditMinuteState } from "./EditMinuteState";
import { WatchModel } from "./WatchModel";
import { WatchModeState } from "./WatchModeState";

export class EditHourState implements WatchModeState {
  goToNextMode(watch: WatchModel): void {
    watch.setState(new EditMinuteState());
    console.log("Switching to Edit Minute mode");
  }

  increment(watch: WatchModel): void {
    let newHour = watch.getCurrentTime().getHours() + 1;
    watch.setCurrentTime(new Date(watch.getCurrentTime().setHours(newHour)));
  }
}
