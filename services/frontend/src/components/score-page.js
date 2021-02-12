import jQuery from 'jquery';
const $ = jQuery;
export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
        <div class="font-title">Score</div>
        <progress id="score-percentage" value="25" max="100">25</progress>
        `;
      this.innerHTML = htmlTemplate;
    }
    connectedCallback() {
      const user_id = this.getAttribute('user_id');
      const quiz_id = this.getAttribute('quiz_id');
      const scoreElement = this.querySelector('.score-percentage');
      this.querySelector('.font-title').innerHTML = this.getAttribute(s);
      this.querySelector('.score-percentage').innerHTML = this.getAttribute(s);
      import('./../state').then(c => c.default({ actionType: "getScore", data: { user_id, quiz_id } }))
        .then((s) => {
          const score = document.createElement("template");
          score.innerHTML = `
            <div class="font-title">${s}</div>
            <progress id="score-percentage" value="${s}" max="100">${s}</progress>
          `;
          scoreElement.appendChild(score.content.cloneNode(true));



          // $('.font-title').text(s);
          // $('.score-percentage').val(s);
          s >= 50 ? $('.score-percentage').css('background-colour', 'green') : $('.score-percentage').css('background-colour', 'red');
        });
    }
  }
  window.customElements.define('score-page', CustomElement);
});
