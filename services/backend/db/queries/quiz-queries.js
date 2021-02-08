const db = require('../quiz.json');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'quiz_entities'
});

pool.connect();

const getQuizzes = function() {
  return pool.query(`
  SELECT * FROM quizzes
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email])
    .then(res => res.rows.length ? res.rows[0] : null)
    .catch(err => err.stack);
};
exports.getUserWithEmail = getUserWithEmail;

const getQuizzesById = function(id) {
  `SELECT * FROM quizzes
  WHERE users_id = '${id}'`
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
  SELECT * FROM
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
