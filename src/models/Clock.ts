import { ClockController } from "../controllers/ClockController";
import { ClockView } from "../views/ClockView";
import { ClockModel } from "./ClockModel";

export class Clock {
  private model: ClockModel;
  private view: ClockView;
  private controller: ClockController;

  constructor(clockId: string) {
    this.model = new ClockModel();
    this.view = new ClockView(clockId);
    this.controller = new ClockController(this.model, this.view);

    this.model.attach(this.view);

    // Setup event listeners for the clock controls
    // Assuming button IDs are unique for each clock instance (e.g., "modeButton1")
    document
      .getElementById(`modeButton${clockId}`)
      ?.addEventListener("click", () =>
        this.controller.handleModeButtonPress()
      );
    document
      .getElementById(`increaseButton${clockId}`)
      ?.addEventListener("click", () =>
        this.controller.handleIncreaseButtonPress()
      );
    document
      .getElementById(`lightButton${clockId}`)
      ?.addEventListener("click", () =>
        this.controller.handleLightButtonPress()
      );
  }
}
