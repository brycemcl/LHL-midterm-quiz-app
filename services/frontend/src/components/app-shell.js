export default (() => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      const htmlTemplate = `
      <div class="flex justify-center min-h-screen">
      <div class="container md:mx-6 my-6">
<nav-bar>
</nav-bar>
    <div class="inside-of-shell"></div>
    </div>
    </div>
        `;
      this.innerHTML = htmlTemplate;
    }
    connectedCallback() {
      const elementsInsideOfShell = ["app-logo", "app-shell", "nav-bar", "nav-button", "question-title", "quiz-question", "quiz-submit"]
        .filter(element => element !== "app-shell" && element !== "nav-bar" && element !== "nav-button" && element !== "app-logo");
      const insideOfShell = this.querySelector('.inside-of-shell');
      elementsInsideOfShell.forEach(element => {
        const elementToAppend = document.createElement(element);
        // elementToAppend.classList.add("hidden");
        insideOfShell.appendChild(elementToAppend);
      });
    }
  }
  window.customElements.define('app-shell', CustomElement);
});