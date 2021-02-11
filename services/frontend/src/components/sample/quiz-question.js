export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const containerTemplate = `
      <div class="flex flex-col flex-none p-4 card">
      <div class="options border-solid border-0 rounded-3xl secondary-card-color">
      </div>
      </div>
      `
      this.innerHTML = containerTemplate;
    }
    connectedCallback() {
      const options = document.querySelector(".options");
      import('./../state').then(c => c.default({ actionType: "getOptions", data: {question_id} })).then((o) => {
        $(options).empty();
        o.forEach(element => {
          const option = document.createElement("template");
          option.innerHTML = `<div class="border-solid border-0 rounded-3xl primary-card-color">${o}</div>`;
          options.appendChild(option.content.cloneNode(true));
        })
      })
    }
  }
  window.customElements.define('options', CustomElement);
})
