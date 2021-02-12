// import state from './state';
import jQuery from 'jquery';
const $ = jQuery;
const qs = Document.querySelector;
const events = {};
// state.user = 1; //update based off of url of page


events.getQuizzesTakenByUser = (user_id) => {
  $.getJSON(`'/api/quiz-taker/user/${user_id}`, (response) => {
    state.recentQuizzes = response;
    return response;
  });
};

events.getQuizById = (quiz_id) => {
  $.getJSON(`/api/quiz-taker/${quiz_id}`, (response) => {
    state.specificQuiz = response;
    return response;
  });
};

events.editAnswer = (answer, option_id) => {
  const data = { 'answer': answer, 'option': option_id };
  $.ajax({
    url: `/api/quiz-taker/${answer.quiz_id}/answer`,
    method: 'POST',
    data: data
  })
    .then(() => {
      console.log('Answer updated successfully');
    });
};


events.getScores = (user_id, quiz_id) => {
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
console.log(events.getScores(1, 6));

events.deleteAnswers = (quiz_id, user_id) => {
  $.ajax({
    url: `/api/quiz-taker/${quiz_id}/delete`,
    method: 'POST',
    data: user_id
  })
    .then(() => {
      console.log('Quiz deleted womp womp wommmmp');
    });
};
