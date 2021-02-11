export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const containerTemplate = `
      <div class="font-title">
      </div>
      `
      this.innerHTML = containerTemplate;
    }
    connectedCallback() {
      const question = document.querySelector(".font-title");
      import('./../state').then(c => c.default({ actionType: "getQuestion", data: {question_id} })).then((q) => {
        $(question).empty();
        question.innerHTML = q.text_answer;
      })
    }
  }
  window.customElements.define('question', CustomElement);
});
