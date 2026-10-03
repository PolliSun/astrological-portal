export class TabContent {
  constructor(container) {
    this.container = container;
  }

  async render(renderFn) {
    this.container.innerHTML = '<div class="loading">Загрузка...</div>';
    try {
      await renderFn(this.container);
    } catch (error) {
      console.error(error);
      this.container.innerHTML = `<p class="error">Ошибка загрузки раздела.</p>`;
    }
  }
}
