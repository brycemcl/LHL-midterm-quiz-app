import jQuery from 'jquery';
const $ = jQuery;
const qs = Document.querySelector;
const events = {};
const state = {};
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

// get all the quizzes
events.getRecentQuizzes = () => {
  $.getJSON('/api/', (response) => {
    state.recentQuizzes = response;
    return response;
  });
};

// api.getRecentQuizzes();
const updateState = (() => {
  return (action) => {
    const { actionType, data = null } = action;
    return events[actionType]({ data })
  }
});
