// import state from './state';
import jQuery from 'jquery';
const $ = jQuery;
const qs = Document.querySelector;
const events = {};
// state.user = 1; //update based off of url of page









taker.getScores = (user_id, quiz_id) => {
  const data = { user_id, quiz_id };
  $.ajax({
    url: `/api/quiz-taker/${quiz_id}/score`,
    method: 'POST',
    data: data
  })
    .then(response => {
      console.log('score response:', response[0].percentage); // state.score = response;
      return response[0].percentage;
    });
};
console.log(taker.getScores(1, 6));

taker.deleteAnswers = (quiz_id, user_id) => {
  $.ajax({
    url: `/api/quiz-taker/${quiz_id}/delete`,
    method: 'POST',
    data: user_id
  })
    .then(() => {
      console.log('Quiz deleted womp womp wommmmp');
    });
};
