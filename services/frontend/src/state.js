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
    // item.shotName = 
    const newItem = item[0];
    console.log(newItem);
    return item;
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

// const _ = require('./makerStateFunction');


// get all the quizzes
events.getRecentQuizzes = () => {
  $.getJSON('/api/', (response) => {
    state.recentQuizzes = response;
    return response;
  });
};

events.getQuizzesTakenByUser = () => {
  $.getJSON(`'/api/quiz-taker/user/${id}`, (response) => {
    state.recentQuizzes = response;
    return response;
  });
};

// events.getQuizById = () => {
//   $.getJSON(`/api/quiz-taker/${id}`, (response) => {
//     state.specificQuiz = response;
//     return response;
//   });
// };


// $.ajax({ url: `/api/quiz-taker/${id}/answer`, method: 'POST', data: /*onclick submitted data*/})
//   .then(() => {

//   });

// $.ajax({ url: `/api/quiz-taker/${id}/score`, method: 'POST', data: /*onclick submitted data*/})
//   .then(() => {

//   });

// $.ajax({ url: `/api/quiz-taker/${id}/delete`, method: 'POST', data: /*onclick submitted data*/})
//   .then(() => {

//   });

// api.getRecentQuizzes();
const updateState = (() => {
  return (action) => {
    const { actionType, data = null } = action;
    return events[actionType]({ data });
  };
})();

export default updateState;
