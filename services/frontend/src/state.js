import jQuery from 'jquery';
const $ = jQuery;
const api = {};
const state = {};
// $.ajax({
//   url: '/api/',
//   data: {
//     format: 'json'
//   }
// }).then((r) => { console.log(r); }).catch((e) => { console.log(e); });
api.getRecentQuizes = () => {
  $.getJSON('/api/', (r) => {
    state.recentQuizes = r;
  });
};



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

console.log(state);
export default updateState;