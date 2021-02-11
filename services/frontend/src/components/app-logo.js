export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
      <div class="flex flex-col self-center">
      <span class="logo ">
      Q
      </div>
      </span>
      `;
      this.innerHTML = htmlTemplate;
    }
  }
  window.customElements.define('app-logo', CustomElement);

});