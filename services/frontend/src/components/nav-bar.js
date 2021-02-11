import jQuery from 'jquery';
const $ = jQuery;
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
      const navButtons = document.querySelector("#nav-buttons");
      console.log(navButtons);
      import('./../state').then(c => c.default({ actionType: "getNavPages", data: {} })).then((c) => {
        $(navButtons).empty();
        c.forEach(element => {
          // console.log(element);
          const button = document.createElement("template");
          button.innerHTML = `<nav-button text="${element}"></nav-button>`;
          console.log(navButtons);
          navButtons.appendChild(button.content.cloneNode(true));
          // navButtons.appendChild(button);
        });
      });
    }
  }
  window.customElements.define('nav-bar', CustomElement);
});