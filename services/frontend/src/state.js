import jQuery from 'jquery';
const $ = jQuery;
const api = {};
const state = {};

api.getRecentQuizes = () => {
  $.getJSON('/api/', (r) => {
    state.recentQuizes = r;
  });
};

api.getRecentQuizes();

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

setInterval(() => {
  console.log(state);
}, 5000);
export default updateState;