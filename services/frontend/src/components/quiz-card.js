import { formatRelative } from "date-fns";
export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const element = this;
      const htmlTemplate = `
<!-- quiz card -->
<div class="flex flex-row flex-none w-full p-4 card">
  <div class="border-solid border-0 rounded-3xl secondary-card-color">
    <div class="border-solid border-0 rounded-3xl primary-card-color">
      <div class="bg-transparent p-6">
        <img width="auto" height="auto" />
      </div>
    </div>
    <div class="bg-transparent p-6 flex flex-col">
      <div class="flex-1 bg-transparent font-title quiz-card-title"></div>
      <div class="flex-1 py-2 bg-transparent quiz-card-description"></div>
      <div class="flex-1 bg-transparent flex flex-row justify-between">
        <div class="bg-transparent quiz-card-username"></div>
        <div class="bg-transparent quiz-card-date"></div>
      </div>
    </div>
  </div>
</div>
        `;
      this.innerHTML = htmlTemplate;
    }
    connectedCallback() {
      this.querySelector('img').setAttribute("src", this.getAttribute('image-src'));
      this.querySelector('.quiz-card-title').innerHTML = this.getAttribute('title');
      this.querySelector('.quiz-card-description').innerHTML = this.getAttribute('description');
      this.querySelector('.quiz-card-username').innerHTML = this.getAttribute('username');
      this.querySelector('.quiz-card-date').innerHTML = formatRelative(new Date(this.getAttribute('date')), new Date());
      // this.querySelector('.quiz-card-date').innerHTML = formatRelative(new Date("Fri Feb 12 2021 03:28:47 GMT-0800 (Pacific Standard Time)"), new Date());
      // const pageAttribute = this.getAttribute('shortName');
      // this.addEventListener("click", (event) => {
      //   import('../state').then(c => c.default({ actionType: "changePage", data: { page: pageAttribute, event } }));
      // });
    }
  }
  window.customElements.define('quiz-card', CustomElement);
});


