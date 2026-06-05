import horoscopesData from "../../utils/horoscopes.json";
import namesData from "../../utils/names.json";
import cardsData from "../../utils/cards.json";

import { displayHoroscopes } from "../displayHoroscopes.js";
import { displayCards } from "../displayCards.js";
import { nameAnalysis } from "../nameAnalysis.js";
import { BlogSection } from "./BlogSection.js";

export class TabContent {
  constructor(container) {
    this.container = container;
  }

  async render(tabName) {
    this.container.innerHTML = "";

    try {
      switch (tabName) {
        case "horoscope":
          const horoHtml = await import("../../sections/horoscope.html");
          this.container.innerHTML = horoHtml.default;
          displayHoroscopes(horoscopesData);
          break;
        case "card":
          const cardHtml = await import("../../sections/card.html");
          this.container.innerHTML = cardHtml.default;
          displayCards(cardsData);
          break;
        case "name":
          const nameHtml = await import("../../sections/name.html");
          this.container.innerHTML = nameHtml.default;
          nameAnalysis(namesData);
          break;
        case "blog":
          new BlogSection(this.container).render();
          break;
        default:
          this.container.innerHTML = `<p>Раздел «${tabName}» не найден</p>`;
      }
    } catch (error) {
      this.container.innerHTML = `<p class="error">Ошибка загрузки раздела. Попробуйте позже.</p>`;
    }
  }
}
