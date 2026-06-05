import { createStarryBackground } from "./starryBackground.js";
import { TabContent } from "./common/TabManager.js";
import { Navigation } from "./common/Navigation.js";
import { Modal } from "./common/Modal/Modal.js";
import { Login } from "./common/Login.js";
import { CreateTheme } from "./common/CreateTheme.js";

export class App {
  constructor() {
    this.init();
  }

  init() {
    createStarryBackground();

    const navContainer = document.getElementById("navigation");
    const tabContainer = document.getElementById("tab");
    const modal = document.getElementById("modal");

    this.tab = new TabContent(tabContainer);
    this.modal = new Modal(modal);

    tabContainer.addEventListener("open-theme-modal", () => {
      this.modal.open("Предложить тему", new CreateTheme());
    });

    navContainer.addEventListener("tab-change", (e) => {
      this.tab.render(e.detail.tab);
    });
    this.navigation = new Navigation(navContainer);

    this._initGlobalButtons();
  }

  _initGlobalButtons() {
    const loginBtn = document.querySelector(".header__button_login");
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        this.modal.open(
          "Авторизация",
          new Login({
            onLoginSuccess: (user) => {
              this.modal.close();
            },
          }),
        );
      });
    }
  }
}
