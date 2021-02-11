import jQuery from 'jquery';
const $ = jQuery;
const qs = Document.querySelector;
const events = {};
export const state = {};
state.page = "home"; //update based off of url of page

events.getNavPages = () => {
  if (state.page === "home") {
    return ["Home", "All Quizzes"];
  } else if (state.page === "take") {
    return [];
  } else if (state.page === "make") {
    return [];
  } else if (state.page === "login") {
    return [];
  } else {
    return [];
  }
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
