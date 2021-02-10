import jQuery from 'jquery';
const $ = jQuery;

// $.ajax({
//   url: '/api/',
//   data: {
//     format: 'json'
//   }
// }).then((r) => { console.log(r); }).catch((e) => { console.log(e); });
$.getJSON('https://quiz-app.brycemclachlan.me/api/', (r) => {
  console.log(r);
});



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