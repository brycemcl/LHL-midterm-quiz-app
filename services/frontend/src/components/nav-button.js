export default (() => {
  // import { $, jQuery } from 'jquery';
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
          <div class="font-title self-center"></div>
        `;
      this.innerHTML = htmlTemplate;
      this.addEventListener("click", (event) => {
        import('./../state').then(c => c.default(event));
      });
      this.querySelector('div').innerHTML = this.getAttribute('text');
    }
  }
  window.customElements.define('nav-button', CustomElement);
});