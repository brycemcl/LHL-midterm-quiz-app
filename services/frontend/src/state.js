import jQuery from 'jquery';
const $ = jQuery;
const qs = Document.querySelector;
const events = {};
export const state = {};
state.page = "home"; //update based off of url of page
state.user = 1; //update based off of url of page

const pages = {
  home: { name: "Home", page: "/" },
  usersQuizzes: { name: "My Quizzes", page: "/my-quizzes" },
  browse: { name: "Browse Quizzes", page: "/browse" },
  logout: { name: "Logout", page: "/" },
  login: { name: "Login", page: "/" }
};

events.getNavPages = () => {
  let pagesToReturn = [];
  if (state.user) {
    pagesToReturn = ["home", "usersQuizzes", "browse", "logout"];
  } else {
    pagesToReturn = ["home", "usersQuizzes", "login"];
  }
  return pagesToReturn.map((item) => [pages[item], item]).map((item) => {
    const newItem = item[0];
    newItem.shortName = item[1];
    return newItem;
  });
};

events.changePage = ({ data }) => {
  console.log(data.page);
  // state.page= pages.
  // if (state.page) {
  //   return [{ name: "Home", url: "/" }, { name: "My Quizzes", url: "/my-quizzes" }, "Browse Quizzes", "Log Out"];
  // } else {
  //   return ["Home", "Browse Quizzes", "Login"];
  // }
};

// get all the quizzes
events.getRecentQuizzes = () => {
  $.getJSON('/api/', (response) => {
    state.recentQuizzes = response;
    return response;
  });
};

const updateState = (() => {
  return (action) => {
    const { actionType, data = null } = action;
    return events[actionType]({ data })
  }
});
