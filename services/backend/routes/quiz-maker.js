const express = require('express');
const router = express.Router();
const { getQuizzesByIdCreated, getQuizById, editQuiz, editQuestion, editOptions, postQuizzes, deleteQuiz } = require('../db/queries/quiz-queries');
const bodyParser = require('body-parser');

// use and set middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// All the quizzes that the user has made
// params: user_id
// not working (add another endpoint)
router.get('/user/:id', (req, res) => {
  const user_id = req.params.id;
  getQuizzesByIdCreated(user_id)
    .then(quizzes => {
      res.json(quizzes);
    });
});

// A specific quiz that the user has made
// params: quiz id
router.get('/:id', (req, res) => {
  const quiz_id = req.params.id;
  getQuizById(quiz_id)
    .then(quiz => {
      res.json(quiz);
    });
});

// Editing a specific quiz
// There are three types for maker: editQuiz, editQuestion, editOptions
// parms: user_id(author)
router.post('/quiz', (req, res) => {
  // maybe implement session cookie
  const quiz = req.body;
  editQuiz(quiz)
    .then(quizzes => {
      res.json(quizzes);
    })
});

router.post('/question', (req, res) => {
  const question = req.body;
  editQuestion(question)
    .then(quizzes => {
      res.json(quizzes);
    })
});

// this route still needs testing
router.post('/option', (req, res) => {
  const option = req.body;
  editOptions(option)
    .then(quizzes => {
      res.json(quizzes);
    })
});

// Adding a new quiz
// params: quiz
router.post('/', (req, res) => {
  // receiving a new quiz to be deleted
  const quiz = req.body;
  postQuizzes(quiz)
    .then(quiz => {
      res.send('quiz added!');
    });
});

// Deleting a quiz that the author made, sets is_current to false so it can be rendered as hidden
// params: quiz_id
router.post('/:id/delete', (req, res) => {
  const quiz_id = req.params.id;
  deleteQuiz(quiz_id)
    .then(quizzes => {
      res.send('quiz deleted!');
    })
});

module.exports = router;
