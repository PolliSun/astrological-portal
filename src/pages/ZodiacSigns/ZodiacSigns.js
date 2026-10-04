import baseHtml from "../../sections/horoscope.html";
import { getZodiacSigns } from "../../api/zodiacSigns.js";
import { getRandomItem } from "../../utils/utils.js";

export class ZodiacSigns {
  constructor(container) {
    this.container = container;
    this.data = null;
  }

  async render() {
    this.container.innerHTML = baseHtml;
    this.data = await getZodiacSigns();
    this.renderSigns();
  }

  renderSigns() {
    const zodiacList = document.querySelector(".horoscope__signs");
    const zodiacTemplate = document.getElementById("horoscope-template");
    const horoscopeDisplay = document.querySelector(".display-horoscope");
    const horoscopeText = horoscopeDisplay.querySelector(
      ".display-description",
    );
    const horoscopeDisplayName =
      horoscopeDisplay.querySelector(".display-title");

    const signPredictions = {};

    Object.values(this.data).forEach((sign) => {
      const zodiacCard = zodiacTemplate.content.cloneNode(true);
      const zodiacName = zodiacCard.querySelector(".horoscope__sign-name");
      const zodiacDate = zodiacCard.querySelector(".horoscope__sign-date");

      zodiacName.textContent = sign.name;
      zodiacDate.textContent = `${sign.startDate} — ${sign.endDate}`;

      const zodiacItem = zodiacCard.querySelector(".horoscope__sign");

      zodiacItem.addEventListener("click", () => {
        const allZodiacItems = document.querySelectorAll(".horoscope__sign");
        allZodiacItems.forEach((item) => item.classList.remove("active"));
        zodiacItem.classList.add("active");

        const predictions = Object.values(sign.horoscopes?.daily ?? {});

        if (!signPredictions[sign.name]) {
          signPredictions[sign.name] = getRandomItem(predictions);
        }

        horoscopeDisplayName.textContent = sign.name;
        horoscopeText.textContent = `"${signPredictions[sign.name]}"`;
      });

      zodiacList.appendChild(zodiacCard);
    });
  }
}
