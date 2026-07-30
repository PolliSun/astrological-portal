import horoscopesData from "../../utils/horoscopes.json";
import articlesData from "../../utils/articles.json";
import namesData from "../../utils/names.json";
import cardsData from "../../utils/cards.json";

import { displayHoroscopes } from "../displayHoroscopes.js";
import { displayCards } from "../displayCards.js";
import { displayArticles } from "../displayArticles.js";
import { nameAnalysis } from "../nameAnalysis.js";

export class TabManager {
  constructor() {
    this.currentTab = "horoscope";
    this.tabContents = document.getElementById("tab-content");
    this.init();
  }

  init() {
    this.loadTab("horoscope");

    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const tabName = e.target.dataset.tab;
        this.switchTab(tabName);
      });
    });
  }

  async loadTab(tabName) {
    const html = await import(`../../sections/${tabName}.html`);

    this.tabContents.innerHTML = html.default;

    this.updateActiveButton(tabName);

    this.currentTab = tabName;
    this.initializeTabComponent(tabName);
  }

  initializeTabComponent(tabName) {
    switch (tabName) {
      case "horoscope":
        displayHoroscopes(horoscopesData);
        break;
      case "card":
        displayCards(cardsData);
        break;
      case "name":
        nameAnalysis(namesData);
        break;
      case "blog":
        displayArticles(articlesData);
        break;
    }
  }

  updateActiveButton(tabName) {
    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.remove("active");
    });

    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
      activeBtn.classList.add("active");
    }
  }

  switchTab(tabName) {
    if (this.currentTab === tabName) return;

    this.loadTab(tabName);
  }
}
