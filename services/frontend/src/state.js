import jQuery from 'jquery';
const $ = jQuery;
const api = {};
const state = {};

setInterval(() => {
  console.clear();
  console.log(state);
}, 5000);

api.getRecentQuizzes = () => {
  $.getJSON('/api/', (r) => {
    state.recentQuizzes = r;
  });
};





api.getRecentQuizzes();





const updateState = (() => {
  const actions = [];
  return (action) => {
    const { actionType, ...rest } = action;

    actions.push(action);
    return { actions };
  };
})();

export default updateState;