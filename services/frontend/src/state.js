import jQuery from 'jquery';
const $ = jQuery;
const api = {};
const updateDom = {};
const state = {
  page: "home"
};

setInterval(() => {
  console.clear();
  console.log(state);
}, 5000);

api.getRecentQuizzes = () => {
  $.getJSON('/api/', (response) => {
    state.recentQuizzes = response;
    return response;
  });
};
updateDom.updateRecentQuizzes = () => {
  Document.querySelector();
  if (state.page === "home") {

  } else {

  }
  //update dom here
};




api.getRecentQuizzes();





const updateState = (() => {
  const actions = [];
  return (action) => {
    const { actionType, ...rest } = action;
    api[actionType]({ data=null }).then((result) => {

    }).catch((err) => {

    });
    actions.push(action);
    return { actions };
  };
})();

export default updateState;