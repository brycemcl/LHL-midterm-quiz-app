export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
        <div class="bg--800 flex justify-between">
          <!-- logo -->
          <app-logo></app-logo>
          <!-- nav -->
          <nav-button text="here"></nav-button>
        </div>
        `;
      this.innerHTML = htmlTemplate;
      // this.querySelector('.contents').innerHTML = this.getAttribute('text');
    }
    connectedCallback() {
      import('./../state').then(c => c.default({ actionType: "getNavPages", data: {} }));
    }
  }
  window.customElements.define('nav-bar', CustomElement);
});