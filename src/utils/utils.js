export const toggleActiveClass = (elements, activeElement) => {
  elements.forEach((el) => el.classList.remove("active"));
  activeElement.classList.add("active");
}

export const getRandomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};