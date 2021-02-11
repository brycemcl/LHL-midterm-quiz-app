import state from './state';
import updateState from './state';

events.getQuizzesByIdCreated = (user_id) => {
  $.getJSON(`/api/quiz-maker/user/${user_id}`, (response) => {
    state.quizzesCreated = response;
    return response;
  });
};

events.getQuizById = (quiz_id) => {
  $.getJSON(`/api/quiz-maker/${quiz_id}`, (response) => {
    state.specificQuiz = response;
    return response;
  });
};

events.editQuiz = (quiz) => {
  $.ajax({
    url: '/api/quiz-maker/quiz',
    method: 'POST',
    data: quiz
  })
  .then(() => {
    console.log('Success!');
  })
};

events.editQuestion = (question) => {
  const data = { question };
  $.ajax({
    url: '/api/quiz-maker/question',
    method: 'POST',
    data: question
  })
  .then(() => {
    console.log('question edited succesfully!');
  })
};

events.editOption = (option) => {
  $.ajax({
    url: '/api/quiz-maker/option',
    method: 'POST',
    data: option
  })
  .then(() => {
    console.log('option editted');
  })
};

events.addQuiz = (quiz) => {
  $.ajax({
    url: '/api/quiz-maker/',
    method: 'POST',
    data: quiz
  })
  .then(() => {
    console.log('quiz added!');
  })
};

events.deleteQuiz = (quiz_id) => {
  $.ajax({
    url: `/api/quiz-maker/${quiz_id}/delete`,
    method: 'POST'
  })
  .then(() => {
    console.log('quiz deleted');
  })
};
