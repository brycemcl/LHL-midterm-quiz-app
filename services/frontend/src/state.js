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
  const url = document.location;
  const actions = [];
  return (action) => {
    if (action.url) {

    }
    actions.push(action);
    console.log(actions);
    return { actions, url };
  };
})();

export default updateState;