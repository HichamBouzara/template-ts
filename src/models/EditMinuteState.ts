import { DisplayTimeState } from "./DisplayTimeState";
import { WatchModel } from "./WatchModel";
import { WatchModeState } from "./WatchModeState";

export class EditMinuteState implements WatchModeState {
  goToNextMode(watch: WatchModel): void {
    watch.setState(new DisplayTimeState());
    console.log("Switching to Display Time mode");
  }

  increment(watch: WatchModel): void {
    let newMinute = watch.getCurrentTime().getMinutes() + 1;
    watch.setCurrentTime(
      new Date(watch.getCurrentTime().setMinutes(newMinute))
    );
  }
}
