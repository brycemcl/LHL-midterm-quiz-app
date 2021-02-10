import { $ } from 'jquery';

$.ajax({
  url: '/api/',
  data: {
    format: 'json'
  }
}).then(() => { }).catch(() => { });



const state = (() => {
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


export default state;