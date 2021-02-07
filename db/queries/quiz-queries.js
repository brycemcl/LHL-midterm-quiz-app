const db = require('../quiz.json');

const getQuizzes = function() {
  return db;
};

const getQuizzesById = function(id) {
  for (const quiz of db) {
    if (db[quiz].id === id) {
      return db[quiz];
    }
  }
};

const postQuizzes = function(quiz) {
  const newId = '5';
  quiz.id = newId;

  let newQuiz = {};
  newQuiz[newId] = quiz;

  db.push(newQuiz);
  return db;
}

const editQuiz = function(quiz) {
  // assuming that the quiz has an id
  if (db[quiz.id]) {
    db[quiz.id] = quiz;
    return db[quiz.id];
  }
};

// console.log('call getQuizzes', getQuizzes());
// console.log('call getQuizzesById', getQuizzesById(1));
const newQuiz = {
  title: "quiz5",
  version: 1,
  question: "what's super?"
};

const quizEditted = {
  id: "2",
  title: "quiz2",
  question: "what's the dinner tonight?"
};

// console.log(postQuizzes(newQuiz));
// console.log('post a new quiz', postQuizzes(newQuiz));

module.exports = {
  getQuizzes,
  getQuizzesById
}
