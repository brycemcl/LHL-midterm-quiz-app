export default (() => {
  import { $, jQuery } from 'jquery';
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
          <div class="font-title self-center">Lorem, ipsum dolor.</div>
        `;
      this.innerHTML = htmlTemplate;
      // this.querySelector('.contents').innerHTML = this.getAttribute('text');
    }
  }
  window.customElements.define('nav-button', CustomElement);
});