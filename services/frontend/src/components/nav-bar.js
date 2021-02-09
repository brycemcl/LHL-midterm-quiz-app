export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
      <nav class="flex justify-between">
      <span class"">tweeter</span>
      <span class="">Write a new tweet</span>
      </nav>
      <div class="container"></div>
      `;
      this.innerHTML = htmlTemplate;
    }
  }
  window.customElements.define('nav-bar', CustomElement);

})