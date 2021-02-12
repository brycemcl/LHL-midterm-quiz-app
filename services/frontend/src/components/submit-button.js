import jQuery from 'jquery';
const $ = jQuery;
export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
      <div class="submit-quiz">Submit</div>
        `;
      this.innerHTML = htmlTemplate;
    }
    connectedCallback() {
      $('.submit-quiz').click(function () {
        $('.submit-quiz').hide();
        //hide previous question and options
      });
    }
  }
  window.customElements.define('submit-quiz', CustomElement);
});