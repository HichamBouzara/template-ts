import { RotateAnimation } from "../animations/RotateAnimation";
import { ScaleAnimation } from "../animations/ScaleAnimation";
import { Vector2D } from "../math/Vector2D";
import { ClockModel } from "../models/ClockModel";
import { Observer } from "../patterns/Observer";
import { Subject } from "../patterns/Subject";

export class ClockView implements Observer {
  private timeDisplayElement: HTMLElement;
  private lightStatusElement: HTMLElement;
  public clockElement: HTMLElement;
  private rotationAnimation: RotateAnimation;
  private scaleAnimation: ScaleAnimation;

  constructor(clockId: string) {
    this.timeDisplayElement = document.getElementById(`timeDisplay${clockId}`)!;
    this.lightStatusElement = document.getElementById(`lightStatus${clockId}`)!;
    this.clockElement = document.getElementById(`clock${clockId}`)!;
    this.rotationAnimation = new RotateAnimation(this.clockElement);
    this.scaleAnimation = new ScaleAnimation(this.clockElement);
  }

  public displayTime(time: Date, isLightOn: boolean): void {
    // Update the time display.
    this.timeDisplayElement.textContent = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Update the light status display.
    this.lightStatusElement.textContent = `Light ${isLightOn ? "On" : "Off"}`;

    // Update classes for styling based on the light status.
    if (isLightOn) {
      this.timeDisplayElement.classList.add("light-on");
      this.lightStatusElement.classList.add("light-on");
    } else {
      this.timeDisplayElement.classList.remove("light-on");
      this.lightStatusElement.classList.remove("light-on");
    }
  }

  public update(subject: Subject): void {
    if (subject instanceof ClockModel) {
      const currentTime = subject.getCurrentTime();
      const isLightOn = subject.isLightEnabled();
      this.displayTime(currentTime, isLightOn);
    }
  }

  applyRotationAroundSelf(): void {
    this.rotationAnimation.rotateAroundSelf();
  }

  applyRotationAroundRandomPoint(): void {
    this.rotationAnimation.rotateAroundRandomPoint();
  }

  applyRotationAroundPoint(point: Vector2D): void {
    this.rotationAnimation.rotateAroundPoint(point);
  }

  applyScalingUpAndDown(): void {
    this.scaleAnimation.scaleUpAndDown();
  }
}
