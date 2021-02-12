export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
      <div class="flex justify-center min-h-screen">
      <div class="container md:mx-6 my-6">
<nav-bar>
</nav-bar>
    <div class="inside-of-shell">
    <inside-of-shell>
    </inside-of-shell>
    </div>
    </div>
    </div>
        `;
      this.innerHTML = htmlTemplate;
    }
    // connectedCallback() {
    // createInsideOfShell(this.querySelector('.inside-of-shell'));
    // }
  }
  window.customElements.define('app-shell', CustomElement);
});