import state from './state';

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
}

events.getScores = (quiz_id, user_id) => {
  const data = { quiz_id, user_id };
  $.ajax({
    url: `/api/quiz-taker/${quiz_id}/score`,
    method: 'POST',
    data: data
  })
    .then((res) => {
      state.score = res;
    });
}

events.deleteAnswers = (quiz_id, user_id) => {
  $.ajax({
    url: `/api/quiz-taker/${quiz_id}/delete`,
    method: 'POST',
    data: user_id
  })
  .then(() => {
    console.log('Quiz deleted womp womp wommmmp');
  });
}

