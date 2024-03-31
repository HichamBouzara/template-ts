import { WatchModel } from "./models/WatchModel";
import { WatchView } from "./views/WatchView";
import { WatchController } from "./controllers/WatchController";

// Function to initialize a clock instance
function initializeClock(clockId: string) {
  const model = new WatchModel();
  const view = new WatchView(clockId);
  const controller = new WatchController(model, view);

  model.attach(view);

  // Setup event listeners for the clock controls
  // Assuming button IDs are unique for each clock instance (e.g., "modeButton1")
  document
    .getElementById(`modeButton${clockId}`)
    ?.addEventListener("click", () => controller.handleModeButtonPress());
  document
    .getElementById(`increaseButton${clockId}`)
    ?.addEventListener("click", () => controller.handleIncreaseButtonPress());
  document
    .getElementById(`lightButton${clockId}`)
    ?.addEventListener("click", () => controller.handleLightButtonPress());
}

// Document ready function to ensure the DOM is fully loaded before initialization
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the first clock instance
  // "1" is passed as an ID, assuming the initial clock has ID suffix "1"
  initializeClock("1");

  // Future code to dynamically add clocks could also call initializeClock with a unique ID
});
