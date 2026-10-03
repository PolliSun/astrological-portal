import baseHtml from "../../../sections/modal/modal.html";

export class Modal {
  constructor(container) {
    this.container = container;
    this.isOpen = false;
    this._onClose = null;
    this.init();
  }

  init() {
    this.container.innerHTML = baseHtml;
    this.modalElement = this.container.querySelector(".modal");
    this.modalTitle = this.modalElement.querySelector(".modal__title");
    this.modalContent = this.modalElement.querySelector(".modal__content");
    this.modalButtonClose = this.modalElement.querySelector(
      ".modal__button_close",
    );

    this._attachEvents();
    this.close();
  }

  open(title, component, { onClose } = {}) {
    if (!this.modalTitle || !this.modalContent) return;

    this._onClose = onClose || null;
    this.modalTitle.textContent = title;
    this.modalContent.innerHTML = "";
    component.render(this.modalContent);

    this.modalElement.classList.remove("modal_hidden");
    this.isOpen = true;
  }

  close() {
    if (!this.modalElement) return;
    this.modalElement.classList.add("modal_hidden");
    this.isOpen = false;

    if (this._onClose) {
      this._onClose();
      this._onClose = null;
    }
  }

  _attachEvents() {
    this.modalButtonClose.addEventListener("click", () => this.close());
  }
}
