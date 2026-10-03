import baseHtml from "../../sections/blog.html";
import themesBlockHtml from "../../sections/blog/blog-theme.html";
import forumBlockHtml from "../../sections/blog/blog-forum.html";
import messagesData from "../../utils/messages.json";
import {
  loadLikedMessages,
  addLikedMessage,
  removeLikedMessage,
} from "../../api/likesStorage.js";
import {
  loadLikesCount,
  getLikesCount,
  updateLikesCount,
  saveLikesCount,
} from "../../api/likesCountStorage.js";

export class BlogSection {
  constructor(container) {
    this.container = container;
    this.likedMessages = loadLikedMessages();
    this.likesCount = loadLikesCount();
    this.initLikesCount();
  }

  render() {
    this.container.innerHTML = baseHtml;
    this.injectBlock();
    this.renderMessages();
    this.renderInfoMessages();
    this._initThemeButton();
  }

  injectBlock() {
    const tabsContainer = this.container.querySelector(".blog__content");
    const combinedHtml = themesBlockHtml + forumBlockHtml;
    if (tabsContainer) {
      tabsContainer.insertAdjacentHTML("afterbegin", combinedHtml);
    }
  }

  initLikesCount() {
    if (Object.keys(this.likesCount).length === 0) {
      messagesData.messages.forEach((message) => {
        this.likesCount[message.id] = message.likes;
      });
      saveLikesCount(this.likesCount);
    }
  }

  renderMessages() {
    const messagesContainer = document.querySelector(".blog__forum-messages");
    const messageTemplate = document.getElementById("message-template");

    messagesContainer.innerHTML = "";

    messagesData.messages.forEach((message) => {
      const messageElement = messageTemplate.content.cloneNode(true);
      const messageName = messageElement.querySelector(".blog__forum-name");
      const messageText = messageElement.querySelector(".blog__forum-message");
      const likeButton = messageElement.querySelector(".blog__forum-like");
      const likeCounter = messageElement.querySelector(
        ".blog__forum-like-counter",
      );
      const correntCount = getLikesCount(
        this.likesCount,
        message.id,
        message.likes,
      );

      messageName.textContent = message.author;
      messageText.textContent = message.text;
      likeCounter.textContent = correntCount;

      this.handleLikeCard(message.id, likeButton, likeCounter);

      messagesContainer.appendChild(messageElement);
    });
  }

  renderInfoMessages() {
    const countMessages = document.querySelector(".blog__forum-count");
    const dateMessage = document.querySelector(".blog__forum-date");

    dateMessage.textContent = messagesData.date_creation;

    if (messagesData.messages.length > 0)
      countMessages.textContent = `· ${messagesData.messages.length} сообщения`;
  }

  toggleLikeMessage(messageId, likeButton, likeCounterElement) {
    const isLiked = this.likedMessages.includes(messageId);

    if (isLiked) {
      removeLikedMessage(this.likedMessages, messageId);
      updateLikesCount(this.likesCount, messageId, -1);
      likeButton.classList.remove("blog__forum-like--active");
    } else {
      addLikedMessage(this.likedMessages, messageId);
      updateLikesCount(this.likesCount, messageId, +1);
      likeButton.classList.add("blog__forum-like--active");
    }

    likeCounterElement.textContent = this.likesCount[messageId];
  }

  handleLikeCard(messageId, likeButton, likeCounterElement) {
    if (this.likedMessages.includes(messageId))
      likeButton.classList.add("blog__forum-like--active");

    likeButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.toggleLikeMessage(messageId, likeButton, likeCounterElement);
    });
  }

  _initThemeButton() {
    const btn = this.container.querySelector(".blog__themes-button");
    btn?.addEventListener("click", () => {
      const event = new CustomEvent("open-theme-modal", { bubbles: true });
      this.container.dispatchEvent(event);
    });
  }
}
