import articleData from "../utils/articles.json";

export const displayArticles = () => {
  const blogTemplate = document.getElementById("blog-template");
  const blogContent = document.querySelector(".blog__content");
  const tabsButton = document.querySelectorAll(".blog__tabs-button");

  articleData.articles.forEach((article, index) => {
    const blogCard = blogTemplate.content.cloneNode(true);
    const blogCardTitle = blogCard.querySelector(".display-title");
    const blogCardDescription = blogCard.querySelector(".display-description");
    const blogItem = blogCard.querySelector(".display-blog");
    blogItem.dataset.tab = index + 1;
    if (index === 0) blogItem.classList.add("active");

    blogCardTitle.textContent = article.title;
    blogCardDescription.textContent = article.description;

    blogContent.appendChild(blogItem);
  });

  tabsButton.forEach((tab) => {
    tab.addEventListener("click", () => {
      const blogItem = document.querySelectorAll(".display-blog");
      tabsButton.forEach((button) => button.classList.remove("active"));
      blogItem.forEach((content) => content.classList.remove("active"));

      tab.classList.add("active");
      const tabNumber = tab.dataset.tab;
      document
        .querySelector(`.display-blog[data-tab="${tabNumber}"]`)
        .classList.add("active");
    });
  });
};
