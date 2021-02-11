export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const element = this;
      const htmlTemplate = `
          <div class="font-title self-center"></div>
        `;
      this.innerHTML = htmlTemplate;
      const page = this.getAttribute('page');
      this.addEventListener("click", (event) => {
        import('./../state').then(c => c.default({ "changePage", data: { page, event } }));
      });
      this.querySelector('div').innerHTML = this.getAttribute('text');
    }
  }
  window.customElements.define('nav-button', CustomElement);
});