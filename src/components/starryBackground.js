export function createStarryBackground() {
  const background = document.getElementById("stars-background");
  const numberOfStars = 150;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animation = `twinkle ${
      5 + Math.random() * 5
    }s ease-in-out infinite`;
    star.style.animationDelay = Math.random() * 3 + "s";

    background.appendChild(star);
  }
}
