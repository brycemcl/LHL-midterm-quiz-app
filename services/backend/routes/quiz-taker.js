const express = require('express');
const router = express.Router();
const { getQuizzesByIdTaken, getQuizById, editAnswers, takerDeleteQuiz} = require('../db/queries/quiz-queries');
const bodyParser = require('body-parser');

// use and set middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// All the quizzes that the taker has taken
router.get('/user/:id', (req, res) => {
  const user_id = req.params.id;
  getQuizzesByIdTaken(user_id)
    .then(quizzes => {
      console.log('these are the quizzes', quizzes);
      res.json(quizzes);
    });
});

// A specific quiz that the user has taken
router.get('/:id', (req, res) => {
  const quiz_id = req.params.id;
  getQuizById(quiz_id)
    .then(quiz => {
      res.json(quiz);
    });
});

// Editing a specific quiz
// params:
// answer: answer that the user made for a question
// option: an option to change
router.post('/:id', (req, res) => {
  const { answer, option } = req.body;
  editAnswers(answer, option)
    .then(quizzes => {
      res.json(quizzes);
    });
});

// for a quiz taker, to display results
router.post('/:id/score', (req,res) => {
  const { quiz_id, user_id } = req.body;
  getScore(quiz_id, user_id)
    .then(score => {
      res.json(score);
    })
});

// Deleting answers from a quiz that the taker has done
router.post('/:id/delete', (req, res) => {
  takerDeleteQuiz(req.params.id)
    .then(quizzes => {
      console.log(quizzes);
      res.send('quiz deleted');
    })
});

module.exports = router;
