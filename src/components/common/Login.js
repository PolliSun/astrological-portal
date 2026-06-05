import baseHtml from "../../sections/login/login.html";

export class Login {
  constructor({ onLoginSuccess } = {}) {
    this.onLoginSuccess = onLoginSuccess;
  }

  render(container) {
    container.innerHTML = baseHtml;
    const googleBtn = container.querySelector(".login__button");
    googleBtn?.addEventListener("click", async () => {
      const user = await signInWithGoogle();
      if (user && this.onLoginSuccess) {
        this.onLoginSuccess(user);
      }
    });
  }
}
