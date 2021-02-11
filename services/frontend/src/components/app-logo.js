export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
      <span class="logo self-center">
      Q
      </span>
      `;
      this.innerHTML = htmlTemplate;
    }
  }
  window.customElements.define('app-logo', CustomElement);

});