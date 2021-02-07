const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizzesById } = require('./db/queries/quiz-queries');

// Get all the public quizzes
router.get('/', (req, res) => {
  getQuizzes()
    .then(quizzes => {
      res.json(quizzes);
    });
});

// Getting a specific quiz (stay?)
router.get('/:id', (req, res) => {
  getQuizzesById(req.params.id)
    .then(quiz => {
      res.json(quiz);
    });
});

module.exports = router;
