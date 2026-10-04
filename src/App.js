import { createStarryBackground } from "./utils/starryBackground.js";
import { TabManager } from "./components/TabManager/TabManager.js";
import { Navigation } from "./components/Navigation/Navigation.js";
import { Modal } from "./components/Modal/Modal.js";
import { Login } from "./pages/Login/Login.js";
import { SignOut } from "./pages/SignOut/SignOut.js";
import { CreateTheme } from "./pages/CreateTheme/CreateTheme.js";
import { onUserStateChanged } from "./api/auth.js";
import { loadUserProfile, saveUserProfile } from "./api/users.js";
import { Blog } from "./pages/Blog/Blog.js";
import { ZodiacSigns } from "./pages/ZodiacSigns/ZodiacSigns.js";
import { Names } from "./pages/Names/Names.js";
import { Cards } from "./pages/Cards/Cards.js";
import { NotFound } from "./pages/NotFound/NotFound.js";
import userInfoHtml from "./sections/user/user-info.html";
import Navigo from "navigo";

export class App {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    createStarryBackground();

    const navContainer = document.getElementById("navigation");
    const tabContainer = document.getElementById("tab");
    const modal = document.getElementById("modal");
    const router = new Navigo("/");

    this.tab = new TabManager(tabContainer);
    this.modal = new Modal(modal);
    this.navigation = new Navigation(navContainer);
    this._initAuthListener();

    router
      .on("/horoscope", async () => {
        this.navigation.show();
        await new ZodiacSigns(tabContainer).render();
        this.navigation.setActiveTab("/horoscope");
      })
      .on("/card", async () => {
        this.navigation.show();
        await new Cards(tabContainer).render();
        this.navigation.setActiveTab("/card");
      })
      .on("/name", () => {
        this.navigation.show();
        new Names(tabContainer).render();
        this.navigation.setActiveTab("/name");
      })
      .on("/blog", () => {
        this.navigation.show();
        new Blog(tabContainer).render();
        this.navigation.setActiveTab("/blog");
      })
      .on("/login", () => {
        this.navigation.show();
        if (this.currentUser) {
          router.navigate("/blog");
          return;
        }
        this.modal.open(
          "Авторизация",
          new Login({
            onLoginSuccess: () => {
              this.modal.close();
            },
          }),
          {
            onClose: () => {
              router.navigate("/");
            },
          },
        );
      })
      .on("/blog/create-theme", () => {
        this.navigation.show();
        this.modal.open("Предложить тему", new CreateTheme(), {
          onClose: () => {
            router.navigate("/blog");
          },
        });
      })
      .notFound(() => {
        this.navigation.hide();
        new NotFound().render(tabContainer);
      })
      .resolve();

    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (!link) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      e.preventDefault();
      router.navigate(link.getAttribute("href"));
    });

    router.updatePageLinks?.();
  }

  _initAuthListener() {
    onUserStateChanged(async (user) => {
      if (user) {
        this.currentUser = user;

        let profile = await loadUserProfile(user.uid);

        if (!profile) {
          profile = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          await saveUserProfile(user.uid, profile);
        }
        this._updateUIForLoggedInUser(profile);
      } else {
        this.currentUser = null;
        this._updateUIForLoggedOutUser();
      }
    });
  }

  _updateUIForLoggedInUser(profile) {
    const userInfo = document.querySelector(".header__user");
    const loginBtn = document.querySelector(".header__button_login");

    if (loginBtn) loginBtn.style.display = "none";

    if (userInfo) {
      userInfo.innerHTML = userInfoHtml;

      const userInfoImg = userInfo.querySelector(".header__user_img");
      const userInfoName = userInfo.querySelector(".header__user_name");
      const signOutButton = userInfo.querySelector(".header__user_button");

      if (userInfoImg) userInfoImg.src = profile.photoURL || "";
      if (userInfoName) userInfoName.textContent = profile.displayName || "";
      if (signOutButton) {
        signOutButton.addEventListener("click", () => {
          this.modal.open(
            "Выход",
            new SignOut({
              onClose: () => {
                this.modal.close();
              },
            }),
          );
        });
      }
      userInfo.style.display = "flex";
    }
  }

  _updateUIForLoggedOutUser() {
    const userInfo = document.querySelector(".header__user");
    const loginBtn = document.querySelector(".header__button_login");

    userInfo.style.display = "none";
    loginBtn.style.display = "flex";
  }
}
