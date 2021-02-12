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
      const submit = document.querySelector('.button m-2');
      const user_id = this.getAttribute('question-id');
      const quiz_id = this.getAttribute('quiz_id');
      import('./../state').then(c => c.default({ actionType: "getScore", data: { user_id, quiz_id } }));
      // .then(o => {Scores", data: { user_id, quiz_id } })).then((c) => {;;;
      $(submit).empty();
      //o is score
      //empty quiz title here
      // const button = document.createElement("template");
      // ))
    }
  }
  window.customElements.define('submit-button', CustomElement);
});
