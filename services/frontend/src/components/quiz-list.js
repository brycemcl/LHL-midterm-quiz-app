export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const element = this;
      const htmlTemplate = `
<div class="flex flex-col quiz-list-element">
  <div class="font-title">Quiz List</div>
  <div class="flex flex-row flex-nowrap overflow-auto overscroll-auto quiz-list-container">

  </div>
  </div>
</div>
        `;
      this.innerHTML = htmlTemplate;
    }
    connectedCallback() {
      const quizListContainer = this.querySelector('.quiz-list-container');
      const quizListElement = this.querySelector('.quiz-list-element');

      import('../state').then(c => c.default({ actionType: "getRecentQuizzes", data: {} })).then((quizzes) => {
        console.log(quizzes);
        quizzes.forEach(quiz => {
          const card = document.createElement("template");
          card.innerHTML = `
          <quiz-card
          title="${quiz.title}"
          description=""
          username="${quiz.user_id}"
          date="${quiz.created_at}"
          image-src="https://miro.medium.com/max/700/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
        >
        </quiz-card>`;
          quizListContainer.appendChild(card.content.cloneNode(true));
        });
      });
    }
  }
  window.customElements.define('quiz-list', CustomElement);
});


/*    connectedCallback() {
      const navButtons = document.querySelector(".nav-buttons");
      import('./../state').then(c => c.default({ actionType: "getNavPages", data: {} })).then((c) => {
        $(navButtons).empty();
        c.forEach(element => {
          const button = document.createElement("template");
          button.innerHTML = `<nav-button text="${element.name}" page="${element.page}" shortName="${element.shortName}"></nav-button>`;
          navButtons.appendChild(button.content.cloneNode(true));
        });
      });
    }*/