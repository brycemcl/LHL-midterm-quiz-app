import jQuery from 'jquery';
const $ = jQuery;
const qs = Document.querySelector;
const api = {};
const updateDom = {};
const state = {};
state.page = "home"; //update based off of url of page

api.getNavPages = () => {
  if (state.page === "home") {
    return [];
  } else if (state.page === "home") {
    return [];
  } else if (state.page === "home") {
    return [];
  } else if (state.page === "home") {
    return [];
  } else 
};

// setInterval(() => {
//   console.clear();
//   console.log(state);
// }, 5000);

api.getRecentQuizzes = () => {
  $.getJSON('/api/', (response) => {
    state.recentQuizzes = response;
    updateDom.updateRecentQuizzes();
    return response;
  });
};
updateDom.updateRecentQuizzes = () => {
  const container = qs("");
  if (state.page === "home") {

  } else {

  }
  //update dom here
};




// api.getRecentQuizzes();





const updateState = (() => {
  return (action) => {
    const { actionType, data = null } = action;
    return api[actionType]({ data })
      .then((result) => {
        return { state };
      }).catch((err) => {
        return { state };
      });
  };
})();

export default updateState;