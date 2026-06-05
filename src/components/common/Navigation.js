import baseHtml from "../../sections/navigation/navigation.html";

export class Navigation {
  constructor(container) {
    this.container = container;
    this.currentTab = null;
    this.init();
  }

  init() {
    this.container.innerHTML = baseHtml;
    this.attachEvents();

    const defaultBtn = this.container.querySelector(".tab-button.active");
    const defaultTab = defaultBtn?.dataset.tab || "blog";
    this.switchTab(defaultTab);
  }

  attachEvents() {
    this.container.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab-button");
      if (!btn) return;
      this.switchTab(btn.dataset.tab);
    });
  }

  switchTab(tabName) {
    if (this.currentTab === tabName) return;
    this.currentTab = tabName;
    this.updateActiveButton(tabName);

    const event = new CustomEvent("tab-change", {
      detail: { tab: tabName },
      bubbles: true,
    });
    this.container.dispatchEvent(event);
  }

  updateActiveButton(tabName) {
    this.container.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
  }
}
