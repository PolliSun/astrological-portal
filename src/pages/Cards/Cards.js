import baseHtml from "../../sections/card.html";
import { getCards } from "../../api/cards.js";
import { getRandomItem } from "../../utils/utils";
import { imageMap } from "../../utils/imageMap";

export class Cards {
  constructor(container) {
    this.container = container;
    this.cards = [];
  }

  async render() {
    this.container.innerHTML = baseHtml;
    const data = await getCards();
    this.cards = Object.entries(data.major)
      .map(([id, card]) => ({
        id,
        ...card,
        image: imageMap[card.image],
      }))
      .sort((a, b) => a.number - b.number);
    this.renderCards();
  }

  renderCards() {
    const cardDisplay = document.querySelector(".display-card");
    const cardName = cardDisplay.querySelector(".display-title");
    const cardText = cardDisplay.querySelector(".display-description");
    const cardButton = document.querySelector(".card__item-button");
    const cardImage = document.querySelector(".card__item-image");
    const cardItem = document.querySelector(".card__item");

    cardButton.addEventListener("click", () => {
      const randomCard = getRandomItem(this.cards);
      const randomDescription = getRandomItem(randomCard.description);

      cardName.textContent = randomCard.name;
      cardText.textContent = randomDescription;

      cardImage.src = randomCard.image;
      cardImage.alt = randomCard.name;

      cardItem.classList.add("active");
      cardButton.classList.add("disabled");
    });
  }
}
