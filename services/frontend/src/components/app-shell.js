export default (() => {
  const htmlTemplate = `
    <div class="">
    <nav-bar class="container centered"></nav-bar>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur nulla debitis ab dolorem quasi dicta fuga, laborum possimus. Earum consequuntur vero recusandae corrupti modi eveniet enim, labore fugiat repellat deserunt!
    </div>
    `;

  class CustomElement extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = htmlTemplate;
    }
  }
  window.customElements.define('app-shell', CustomElement);

})