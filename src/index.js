import "./pages/index.css";

import { createStarryBackground } from "./components/starryBackground.js";
import { displayHoroscopes } from "./components/displayHoroscopes.js";
import { displayCards } from "./components/displayCards.js";
import { displayArticles } from "./components/displayArticles.js";
import { nameAnalysis } from "./components/nameAnalysis.js";

import articlesData  from "./utils/articles.json";
import namesData  from "./utils/names.json";
import horoscopesData  from "./utils/horoscopes.json";
import cardsData  from "./utils/cards.json";

document.addEventListener("DOMContentLoaded", () => {
  createStarryBackground();
  displayHoroscopes(horoscopesData);
  displayCards(cardsData);
  nameAnalysis(namesData);
  displayArticles(articlesData);
});
