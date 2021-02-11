export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const element = this;
      const htmlTemplate = `
          <div class="font-title self-center p-4"></div>
        `;
      this.innerHTML = htmlTemplate;
      this.querySelector('div').innerHTML = this.getAttribute('text');
    }
    connectedCallback() {
      const pageAttribute = this.getAttribute('shortName');
      this.addEventListener("click", (event) => {
        import('./../state').then(c => c.default({ actionType: "changePage", data: { page: pageAttribute, event } }));
      });
    }
  }
  window.customElements.define('nav-button', CustomElement);
});