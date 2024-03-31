import { EditHourState } from "./EditHourState";
import { WatchModel } from "./WatchModel";
import { WatchModeState } from "./WatchModeState";

export class DisplayTimeState implements WatchModeState {
  goToNextMode(watch: WatchModel): void {
    watch.setState(new EditHourState());
    console.log("Switching to Edit Hour mode");
  }

  increment(watch: WatchModel): void {}
}
