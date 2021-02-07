const db = require('../quiz.json');

const getQuizzes = function() {
  return db;
};

const getQuizzesById = function(id) {
  if (db[id]) {
    return db[id];
  }
};

const postQuizzes = function(quiz) {
  const newId = Math.floor(Math.random() * 100);
  quiz.id = newId; // add new id into quiz
  db[newId] = quiz;
  return db;
};

const editQuiz = function(id, quiz) {
  // assuming that the quiz has an id
  if (db[id]) {
    db[id] = quiz;
    return db;
  }
};

const deleteQuiz = function(id) {
  if (db[id]) {
    delete db[id];
    return db;
  }
};

module.exports = {
  getQuizzes,
  getQuizzesById,
  postQuizzes,
  editQuiz,
  deleteQuiz
};
