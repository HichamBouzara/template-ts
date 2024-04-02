import { Vector2D } from "../math/Vector2D";
import { ClockModel } from "../models/ClockModel";
import { ClockView } from "../views/ClockView";

export class ClockController {
  private isSelectingPoint: boolean;

  constructor(private model: ClockModel, private view: ClockView) {
    this.updateView();
    this.isSelectingPoint = false;

    // Bind button click events
    document
      .getElementById("rotateSelf")
      .addEventListener("click", () => this.applyRotationAroundSelf());
    document
      .getElementById("rotateRandom")
      .addEventListener("click", () => this.applyRotationAroundRandomPoint());
    document
      .getElementById("rotateSpecified")
      .addEventListener("click", () =>
        this.applyRotationAroundSpecifiedPoint()
      );
    document
      .getElementById("scaleUpDown")
      .addEventListener("click", () => this.applyScalingUpAndDown());
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

  applyRotationAroundSelf() {
    this.view.applyRotationAroundSelf();
  }

  applyRotationAroundRandomPoint() {
    this.view.applyRotationAroundRandomPoint();
  }

  enablePointSelection() {
    this.isSelectingPoint = true;
    // Optional: Provide visual feedback that the user should select a point
  }

  handlePageClick(event: MouseEvent) {
    if (!this.isSelectingPoint) return; // Ignore clicks unless in "point selection mode"

    // Prevent triggering on button click itself
    if ((event.target as HTMLElement).id === "rotateSpecified") return;

    const rect = this.view.clockElement.getBoundingClientRect();

    // Calculate click coordinates relative to the clock's position
    const xRelativeToClock = event.clientX - rect.left;
    const yRelativeToClock = event.clientY - rect.top;

    // Now, use these adjusted coordinates for rotation
    const rotationPoint = new Vector2D(xRelativeToClock, yRelativeToClock);

    console.log("Selected point:", rotationPoint);
    this.view.applyRotationAroundPoint(rotationPoint);
    this.isSelectingPoint = false; // Reset the flag
  }

  applyRotationAroundSpecifiedPoint() {
    this.enablePointSelection();
    document.addEventListener("click", (e) => this.handlePageClick(e)); // Listen for page clicks
  }

  applyScalingUpAndDown() {
    this.view.applyScalingUpAndDown();
  }
}
