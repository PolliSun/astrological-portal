import baseHtml from "../../sections/navigation/navigation.html";
import { Component } from "../../utils/Component.js";

export class Navigation extends Component {
  constructor(container) {
    super(container);
    this.init();
  }

  init() {
    this.container.innerHTML = baseHtml;
  }

  setActiveTab(path) {
    const tab = path.replace(/^\/+/, "");
    this.container.querySelectorAll(".navigation-item").forEach((link) => {
      const linkTab = link.getAttribute("href").replace(/^\/+/, "");
      link.classList.toggle("active", linkTab === tab);
    });
  }
}
