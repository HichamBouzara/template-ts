import { WatchModel } from "../models/WatchModel";

export class WatchView implements Observer {
  private timeDisplayElement: HTMLElement;
  private lightStatusElement: HTMLElement;

  constructor(clockId: string) {
    this.timeDisplayElement = document.getElementById(`timeDisplay${clockId}`)!;
    this.lightStatusElement = document.getElementById(`lightStatus${clockId}`)!;
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
    if (subject instanceof WatchModel) {
      const currentTime = subject.getCurrentTime();
      const isLightOn = subject.isLightEnabled();
      this.displayTime(currentTime, isLightOn);
    }
  }
}
