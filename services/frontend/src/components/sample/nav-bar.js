export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
      <nav class="flex justify-between">
      <app-logo class="container"> </app-logo>
      <span class="top-nav"></span>
      </nav>
      `;
      this.innerHTML = htmlTemplate;
    }
  }
  window.customElements.define('nav-bar', CustomElement);

})