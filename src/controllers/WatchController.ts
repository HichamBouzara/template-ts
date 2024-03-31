import { WatchModel } from "../models/WatchModel";
import { WatchView } from "../views/WatchView";

export class WatchController {
  constructor(private model: WatchModel, private view: WatchView) {
    this.updateView();
  }

  public handleModeButtonPress(): void {
    this.model.toggleMode();
    this.updateView();
  }

  public handleIncreaseButtonPress(): void {
    this.model.incrementTime();
    this.updateView();
  }

  public handleLightButtonPress(): void {
    this.model.toggleLight();
    this.updateView();
  }

  private updateView(): void {
    this.view.displayTime(
      this.model.getCurrentTime(),
      this.model.isLightEnabled()
    );
  }
}
