export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
      <div class="flex flex-col  h-full">
      <div class="logo self-center items-center">
      Q
      </div>
      </div>
      `;
      this.innerHTML = htmlTemplate;
    }
  }
  window.customElements.define('app-logo', CustomElement);

});