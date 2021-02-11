const state = {};
// state.page = ;
//update based off of url of page
// state.page = window.location.pathname.split("/")[1]; //update based off of url of page
state.user = 1; //update based off of url of page
state.page = "/";
const pages = {
  home: { name: "Home", page: "/" },
  usersQuizzes: { name: "My Quizzes", page: "/my-quizzes" },
  browse: { name: "Browse Quizzes", page: "/browse" },
  logout: { name: "Logout", page: "/" },
  login: { name: "Login", page: "/" }
};
console.log(
  Object.keys(pages).filter((item) => {
    return pages[item].page === window.location.pathname.split("/")[1] ? window.location.pathname.split("/")[1] : "/";
  })[0]

);
// console.log(window.location.pathname.split("/"));
// console.log(state.page);
