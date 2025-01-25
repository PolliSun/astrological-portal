import { imageMap } from "../utils/imageMap";
import { getRandomItem } from "../utils/utils";

export const displayCards = (cardsData) => {
  cardsData.cards.forEach((card) => {
    card.image = imageMap[card.image];
  });
  const cardDisplay = document.querySelector(".display-card");
  const cardName = cardDisplay.querySelector(".display-title");
  const cardText = cardDisplay.querySelector(".display-description");
  const cardButton = document.querySelector(".card__item-button");
  const cardImage = document.querySelector(".card__item-image");

  const cardItem = document.querySelector(".card__item");

  cardButton.addEventListener("click", () => {
    const randomCard = getRandomItem(cardsData.cards);
    const randomDescription = getRandomItem(randomCard.description);

    cardName.textContent = randomCard.name;
    cardText.textContent = randomDescription;

    cardImage.src = randomCard.image;
    cardImage.alt = randomCard.name;

    cardItem.classList.add("active");
    cardButton.classList.add("disabled");
  });
};
