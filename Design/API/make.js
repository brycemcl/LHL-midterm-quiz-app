const express = require('express');
const router = express.Router();
const { getQuizzes, postQuizzes, getQuizzesById } = require('./db/queries/quiz-queries');
const bodyParser = require('body-parser');

// use and set middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// All the quizzes that the user has made
router.get('/', (req, res) => {
  getQuizzes()
    .then(quizzes => {
      res.json(quizzes);
    })
});

// A specific quiz that the user has made (questions only)
router.get('/:id', (req, res) => {
  getQuizzesById(req.params.id)
    .then(quiz => {
      res.json(quiz);
    })
});

// Editing a specific quiz
router.post('/:id', (req, res) => {
  editQuiz(req.body)
    .then(quizzes => {
      res.json(quiz);
    })
});

// Adding a new quiz
router.post('/', (req, res) => {
  // receiving a new quiz to be deleted
  postQuizzes(req.body)
    .then(quizzes => {
      res.json(quizzes);
    })
});

// Deleting a quiz that the author made
router.delete('/:id', (req, res) => {
  deleteQuiz(req.body.id)
    .then(res => res.send('quiz deleted'))
});

module.exports = router;
