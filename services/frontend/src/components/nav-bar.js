export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
        <div class="bg--800 flex justify-between">
          <!-- logo -->
          <div class="">Lorem, ipsum dolor.</div>
          <!-- nav -->
          <div class="font-title">Lorem, ipsum dolor.</div>
        </div>
        `;
      this.innerHTML = htmlTemplate;
      // this.querySelector('.contents').innerHTML = this.getAttribute('text');
    }
  }
  window.customElements.define('app-shell', CustomElement);
});