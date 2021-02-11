export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
        <div class="bg--800 flex justify-between">
          <!-- logo -->
          <app-logo></app-logo>
          <div id="nav-buttons">
          <!-- nav -->
          <nav-button text="here"></nav-button>
        </div>
        </div>
        `;
      this.innerHTML = htmlTemplate;
      // this.querySelector('.contents').innerHTML = this.getAttribute('text');
    }
    connectedCallback() {
      import('./../state').then(c => c.default({ actionType: "getNavPages", data: {} })).then((c) => {
        c.forEach(element => {
          console.log(element);
          const button = new document.createElement(nav - button);
          button.outerHTML = `<nav-button text="${element}"></nav-button>`;
          console.log(this);

        });
      });
    }
  }
  window.customElements.define('nav-bar', CustomElement);
});