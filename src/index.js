import "./pages/index.css";

import { createStarryBackground } from "./components/starryBackground.js";
import { TabManager } from "./components/common/TabManager.js";

document.addEventListener("DOMContentLoaded", () => {
  new TabManager();
  createStarryBackground();
});
