import cardData from "../utils/cards.json";

import foolImage from "../images/Taro/Fool.jpg";
import magicianImage from "../images/Taro/Magician.jpg";
import highPriestessImage from "../images/Taro/HighPriestess.jpg";
import empressImage from "../images/Taro/Empress.jpg";
import emperorImage from "../images/Taro/Emperor.jpg";
import hierophantImage from "../images/Taro/Hierophant.jpg";
import loversImage from "../images/Taro/Lovers.jpg";
import chariotImage from "../images/Taro/Chariot.jpg";
import strengthImage from "../images/Taro/Strength.jpg";
import hermitImage from "../images/Taro/Hermit.jpg";
import wheelOfFortuneImage from "../images/Taro/WheelOfFortune.jpg";
import justiceImage from "../images/Taro/Justice.jpg";
import hangedManImage from "../images/Taro/HangedMan.jpg";
import deathImage from "../images/Taro/Death.jpg";
import temperanceImage from "../images/Taro/Temperance.jpg";
import devilImage from "../images/Taro/Devil.jpg";
import towerImage from "../images/Taro/Tower.jpg";
import starImage from "../images/Taro/Star.jpg";
import moonImage from "../images/Taro/Moon.jpg";
import sunImage from "../images/Taro/Sun.jpg";
import judgementImage from "../images/Taro/Judgement.jpg";
import worldImage from "../images/Taro/World.jpg";

const imageMap = {
  Fool: foolImage,
  Magician: magicianImage,
  HighPriestess: highPriestessImage,
  Empress: empressImage,
  Emperor: emperorImage,
  Hierophant: hierophantImage,
  Lovers: loversImage,
  Chariot: chariotImage,
  Strength: strengthImage,
  Hermit: hermitImage,
  WheelOfFortune: wheelOfFortuneImage,
  Justice: justiceImage,
  HangedMan: hangedManImage,
  Death: deathImage,
  Temperance: temperanceImage,
  Devil: devilImage,
  Tower: towerImage,
  Star: starImage,
  Moon: moonImage,
  Sun: sunImage,
  Judgement: judgementImage,
  World: worldImage,
};

cardData.cards.forEach((card) => {
  card.image = imageMap[card.image];
});

export const displayCards = () => {
  const cardDisplay = document.querySelector(".display-card");
  const cardName = cardDisplay.querySelector(".display-title");
  const cardText = cardDisplay.querySelector(".display-description");
  const cardButton = document.querySelector(".card__item-button");
  const cardImage = document.querySelector(".card__item-image");

  const cardItem = document.querySelector(".card__item");

  cardButton.addEventListener("click", () => {
    const randomCard = Math.floor(Math.random() * cardData.cards.length);
    const selectedCard = cardData.cards[randomCard];

    const randomDescription = Math.floor(
      Math.random() * selectedCard.description.length
    );
    const selectedDescription = selectedCard.description[randomDescription];

    setTimeout(() => {
      cardName.textContent = selectedCard.name;
      cardText.textContent = selectedDescription;
    }, 200);

    cardImage.src = selectedCard.image;
    cardImage.alt = selectedCard.name;

    cardItem.classList.add("active");
    cardButton.classList.add("disabled");
  });
};
