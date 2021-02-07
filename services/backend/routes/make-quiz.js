const express = require('express');
const router = express.Router();
const { getQuizzes, postQuizzes, editQuiz, deleteQuiz, getQuizzesById } = require('../db/queries/quiz-queries');
const bodyParser = require('body-parser');

// use and set middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// All the quizzes that the user has made
router.get('/', (req, res) => {
  const quizzes = getQuizzes();
  res.json(quizzes);
});

// A specific quiz that the user has made (questions only)
router.get('/:id', (req, res) => {
  const quiz = getQuizzesById(req.params.id);
  res.json(quiz);
});

// Editing a specific quiz
router.post('/:id', (req, res) => {
  const id = req.params.id;
  const quizzes = editQuiz(id, req.body);
  res.json(quizzes);
});

// Adding a new quiz
router.post('/', (req, res) => {
  // receiving a new quiz to be deleted
  const quizzes = postQuizzes(req.body);
  res.json(quizzes);
});

// Deleting a quiz that the author made
router.post('/:id/delete', (req, res) => {
  const quizzes = deleteQuiz(req.params.id);
  res.json(quizzes);
});

module.exports = router;
