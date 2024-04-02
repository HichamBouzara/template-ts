import { Clock } from "./models/Clock";

// Document ready function to ensure the DOM is fully loaded before initialization
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the first clock instance
  // "1" is passed as an ID, assuming the initial clock has ID suffix "1"
  const clock1 = new Clock("1");

  // Future code to dynamically add clocks could also call initializeClock with a unique ID
});
