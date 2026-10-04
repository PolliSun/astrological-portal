import baseHtml from "../../sections/sign-out/sign-out.html";
import { signOutUser } from "../../api/auth.js";

export class SignOut {
  constructor({ onClose } = {}) {
    this.onClose = onClose;
  }

  render(container) {
    container.innerHTML = baseHtml;
    const cancelBtn = container.querySelector(".sign-out__button-cancel");
    const submitBtn = container.querySelector(".sign-out__button-submit");

    cancelBtn?.addEventListener("click", () => this.onClose());
    submitBtn?.addEventListener("click", async () => {
      await signOutUser();
      this.onClose();
    });
  }
}
