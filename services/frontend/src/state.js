import jQuery from 'jquery';

$.ajax({
  url: '/api/',
  data: {
    format: 'json'
  }
}).then((r) => { console.log(r); }).catch((e) => { console.log(e); });




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