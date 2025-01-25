import { getRandomItem } from "../utils/utils";

export const displayHoroscopes = (horoscopesData) => {
  const zodiacList = document.querySelector(".horoscope__signs");
  const zodiacTemplate = document.getElementById("horoscope-template");
  const horoscopeDisplay = document.querySelector(".display-horoscope");
  const horoscopeText = horoscopeDisplay.querySelector(".display-description");
  const horoscopeDisplayName = horoscopeDisplay.querySelector(".display-title");

  const signPredictions = {};

  horoscopesData.signs.forEach((sign) => {
    const zodiacCard = zodiacTemplate.content.cloneNode(true);
    const zodiacName = zodiacCard.querySelector(".horoscope__sign-name");
    const zodiacDate = zodiacCard.querySelector(".horoscope__sign-date");

    zodiacName.textContent = sign.name;
    zodiacDate.textContent = sign.date;

    const zodiacItem = zodiacCard.querySelector(".horoscope__sign");

    zodiacItem.addEventListener("click", () => {
      const allZodiacItems = document.querySelectorAll(".horoscope__sign");
      allZodiacItems.forEach((item) => item.classList.remove("active"));
      zodiacItem.classList.add("active");

      if (!signPredictions[sign.name]) {
        signPredictions[sign.name] = getRandomItem(sign.horoscopes);
      }

      horoscopeDisplayName.textContent = sign.name;
      horoscopeText.textContent = `"${signPredictions[sign.name]}"`;
    });

    zodiacList.appendChild(zodiacCard);
  });
};
