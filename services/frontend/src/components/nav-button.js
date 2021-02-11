export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const element = this;
      const htmlTemplate = `
          <div class="font-title self-center py-6"></div>
        `;
      this.innerHTML = htmlTemplate;
      const pageAttribute = this.getAttribute('page');
      this.addEventListener("click", (event) => {
        import('./../state').then(c => c.default({ actionType: "changePage", data: { page: pageAttribute, event } }));
      });
      this.querySelector('div').innerHTML = this.getAttribute('text');
    }
  }
  window.customElements.define('nav-button', CustomElement);
});