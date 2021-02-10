export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
        <div class="flex-row centered px-12 py-6">
        <nav-bar class="container centered"></nav-bar>
        <div class="contents">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At veritatis adipisci quas possimus ipsa? Voluptates, tenetur! Quas voluptatem omnis deleniti ratione placeat, commodi iusto, laudantium unde sequi, delectus eveniet ipsa.
        </div>
        </div>
        `;
      this.innerHTML = htmlTemplate;
      this.querySelector('.contents').innerHTML = this.getAttribute('text');
    }
  }
  window.customElements.define('app-shell', CustomElement);

});