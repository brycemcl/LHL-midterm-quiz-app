import state from './state';
import updateState from './state';



maker.getQuizById = (quiz_id) => {
  $.getJSON(`/api/quiz-maker/${quiz_id}`, (response) => {
    state.specificQuiz = response;
    return response;
  });
};

maker.editQuiz = (quiz) => {
  $.ajax({
    url: '/api/quiz-maker/quiz',
    method: 'POST',
    data: quiz
  })
    .then(() => {
      console.log('Success!');
    });
};

maker.editQuestion = (question) => {
  const data = { question };
  $.ajax({
    url: '/api/quiz-maker/question',
    method: 'POST',
    data: question
  })
    .then(() => {
      console.log('question edited succesfully!');
    });
};

maker.editOption = (option) => {
  $.ajax({
    url: '/api/quiz-maker/option',
    method: 'POST',
    data: option
  })
    .then(() => {
      console.log('option editted');
    });
};

maker.addQuiz = (quiz) => {
  $.ajax({
    url: '/api/quiz-maker/',
    method: 'POST',
    data: quiz
  })
    .then(() => {
      console.log('quiz added!');
    });
};

maker.deleteQuiz = (quiz_id) => {
  $.ajax({
    url: `/api/quiz-maker/${quiz_id}/delete`,
    method: 'POST'
  })
    .then(() => {
      console.log('quiz deleted');
    });
};
