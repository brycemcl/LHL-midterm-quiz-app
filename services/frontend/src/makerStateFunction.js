api.getQuizzesByIdCreated = () => {
  $.getJSON(`/api/quiz-maker/user/${id}`, (response) => {
    state.quizzesCreated = response;
    updateDom.updateQuizzesByIdCreated();
    return response;
  });
};

api.getQuizById = () => {
  $.getJSON(`/api/quiz-maker/${id}`, (response) => {
    state.specificQuiz = response;
    updateDom.updateQuizById();
    return response;
  });
};

updateDom.updateQuizById = () => {
  const container = qs("");
  if (state.page === "home") {

  } else {

  }
};

api.editQuiz = () => {
  $.ajax({
    url: '/api/quiz-maker/quiz',
    method: 'POST',
    data: $(this).serialize()
  })
    .then(() => {
      console.log('Success!');
    });
};

api.editQuestion = () => {
  $.ajax({
    url: '/api/quiz-maker/question',
    method: 'POST',
    data: $(this).serialize()
  })
    .then(() => {
      console.log('Question edited succesfully!');
    });
};

api.editOption = () => {
  $.ajax({
    url: '/api/quiz-maker/option',
    method: 'POST',
    data: $(this).serialize()
  })
    .then(() => {

    });
};

// api.addQuiz = () => {
//   $.ajax({
//     url: '/api/quiz-maker/',
//     method: 'POST',
//     data: $(this).serialize()
//       .then(() => {
//         console.log('quiz added!');
//       })
//   }

// api.deleteQuiz = () => {
//       $.ajax({
//         url: `/api/quiz-maker/${id}/delete`,
//         method: 'POST',
//         data: /*onclick submitted data*/})
//         .then(() => {

//         });
//     }

export getQuizzesByIdCreated,
  getQuizById,
  updateQuizById,
  editQuiz,
  editQuestion,
  editOption,
  addQuiz,
  deleteQuiz;

