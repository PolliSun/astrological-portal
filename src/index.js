import "./pages/index.css";
import { createStarryBackground } from "./components/starryBackground.js";
import { displayHoroscopes } from "./components/displayHoroscopes.js";
import { displayCards } from "./components/displayCards.js";
import { displayArticles } from "./components/displayArticles.js";
import { nameAnalysis } from "./components/nameAnalysis.js";

createStarryBackground();

document.addEventListener("DOMContentLoaded", () => {
  displayHoroscopes();
  displayCards();
  document
    .querySelector(".name__content-button")
    .addEventListener("click", nameAnalysis);

  displayArticles();
});
