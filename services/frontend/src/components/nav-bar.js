export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
        <div class="bg--800 flex justify-between">
          <!-- logo -->
          <app-logo></app-logo>
          <!-- nav -->
          <nav-button></nav-button>
        </div>
        `;
      this.innerHTML = htmlTemplate;
      // this.querySelector('.contents').innerHTML = this.getAttribute('text');
    }
  }
  window.customElements.define('nav-bar', CustomElement);
});