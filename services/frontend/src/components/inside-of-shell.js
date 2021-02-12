export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
<page-home></page-home>
<score-page></score-page>
        `;
      this.innerHTML = htmlTemplate;
    }
  }
  window.customElements.define('inside-of-shell', CustomElement);
});