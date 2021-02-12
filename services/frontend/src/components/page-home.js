export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const element = this;
      const htmlTemplate = `
      <div class="flex flex-row">
      <!-- left welcome message -->
      <div class="flex-1 flex flex-col">
        <div class="flex-1 font-title">
          sequi numquam culpa quis accusantium quaerat repellat corporis
        </div>
        <div class="flex-1">
          sequi numquam culpa quis accusantium quaerat repellat corporis
        </div>
      </div>
      <!-- right welcome image -->
      <div class="flex-1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
        sequi numquam culpa quis accusantium quaerat repellat corporis
        excepturi adipisci, quod, dicta aperiam accusamus blanditiis at
        consequatur asperiores totam similique nihil?
      </div>
      </div>
      <quiz-list>
      </quiz-list>
        `;
      this.innerHTML = htmlTemplate;
      // this.querySelector('div').innerHTML = this.getAttribute('text');
    }
    connectedCallback() {
      // const pageAttribute = this.getAttribute('shortName');
      // this.addEventListener("click", (event) => {
      //   import('../state').then(c => c.default({ actionType: "changePage", data: { page: pageAttribute, event } }));
      // });
    }
  }
  window.customElements.define('page-home', CustomElement);
});