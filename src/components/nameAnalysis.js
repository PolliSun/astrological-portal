export const nameAnalysis = (namesData) => {
  const nameDisplay = document.querySelector(".display-name");
  const displayName = nameDisplay.querySelector(".display-title");
  const displayDescription = nameDisplay.querySelector(".display-description");
  const nameButton = document.querySelector(".name__content-button");
  const nameInput = document.getElementById("name-input");

  nameButton.addEventListener("click", () => {
    const input = nameInput.value.trim();
    displayName.textContent = "";
    displayDescription.textContent = "";

    if (!/^[а-яА-ЯёЁ]+$/.test(input)) {
      displayName.textContent = "Введите корректное имя на русском языке.";
      return;
    }

    const foundName = namesData.names.find((entry) => entry.name === input);

    if (foundName) {
      displayName.textContent = foundName.name;
      displayDescription.textContent = foundName.description;
    } else {
      displayName.textContent =
        "К сожалению, значение данного имени не найдено.";
    }
  });
};
