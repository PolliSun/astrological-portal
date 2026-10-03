export class Component {
  constructor(container) {
    this.container = container;
  }

  hide() {
    this.container.classList.add("hidden");
  }

  show() {
    this.container.classList.remove("hidden");
  }
}
