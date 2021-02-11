export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
      <div class="">
      <div class="logo align-middle">
      Q
      </div>
      </div>
      `;
      this.innerHTML = htmlTemplate;
    }
  }
  window.customElements.define('app-logo', CustomElement);

});