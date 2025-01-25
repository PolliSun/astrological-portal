import {toggleActiveClass} from "../utils/utils.js";

export const displayArticles = (articlesData) => {
  const blogTemplate = document.getElementById("blog-template");
  const blogContent = document.querySelector(".blog__content");
  const tabsButton = document.querySelectorAll(".blog__tabs-button");

  articlesData.articles.forEach((article, index) => {
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
      const blogItems = document.querySelectorAll(".display-blog");
      toggleActiveClass(tabsButton, tab);
      toggleActiveClass(
        blogItems,
        document.querySelector(`.display-blog[data-tab="${tab.dataset.tab}"]`)
      );
    });
  });
};
