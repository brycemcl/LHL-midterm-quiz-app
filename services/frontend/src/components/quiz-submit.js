import jQuery from 'jquery';
const $ = jQuery;
export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
        <div class="flex flex-row justify-evenly">
          <div class="button m-2">Submit</div>
        </div>
        `;
      this.innerHTML = htmlTemplate;
    }
    connectedCallback() {
      const submit = document.querySelector(".submit");
      import('./../state').then(c => c.default({ actionType: "getScores", data: {} })).then((c) => {
        $(submit).empty();
        //empty quiz title here
        const button = document.createElement("template");

      });
    }
  }
  window.customElements.define('submit-button', CustomElement);
});
