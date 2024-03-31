import { WatchController } from "../controllers/WatchController";
import { WatchView } from "../views/WatchView";
import { WatchModel } from "./WatchModel";

class Clock {
  private model: WatchModel;
  private view: WatchView;
  private controller: WatchController;

  constructor() {
    this.model = new WatchModel();
    this.view = new WatchView("1");
    this.controller = new WatchController(this.model, this.view);
  }
}
