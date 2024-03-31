import { DisplayTimeState } from "./DisplayTimeState";
import { WatchModeState } from "./WatchModeState";

export class WatchModel implements Subject {
  private currentTime: Date;
  private currentState: WatchModeState;
  private isLightOn: boolean;
  private observers: Observer[] = [];

  constructor() {
    this.currentTime = new Date();
    this.currentState = new DisplayTimeState();
    this.isLightOn = false;
    this.startClockUpdate();
  }

  public setCurrentTime(time: Date): void {
    this.currentTime = time;
  }

  public getCurrentTime(): Date {
    return this.currentTime;
  }

  public toggleMode(): void {
    this.currentState.goToNextMode(this);
  }

  public incrementTime(): void {
    this.currentState.increment(this);
  }

  public toggleLight(): void {
    this.isLightOn = !this.isLightOn;
  }

  public isLightEnabled(): boolean {
    return this.isLightOn;
  }

  public setState(newState: WatchModeState): void {
    this.currentState = newState;
  }

  public startClockUpdate(): void {
    setInterval(() => {
      // Update the current time every second by adding a new second to the current time
      this.currentTime = new Date(
        this.currentTime.setSeconds(this.currentTime.getSeconds() + 1)
      );
      this.notify();
    }, 1000); // Update every second
  }

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
    }
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}
