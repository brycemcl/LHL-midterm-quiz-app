const express = require('express');
const router = express.Router();
const { getQuizzesByIdTaken, getQuizById, editAnswers, takerDeleteQuiz, getScores } = require('../db/queries/quiz-queries');
const bodyParser = require('body-parser');

// use and set middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// All the quizzes that the taker has taken
router.get('/user/:id', (req, res) => {
  const user_id = req.params.id;
  getQuizzesByIdTaken(user_id)
    .then(quizzes => {
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
// this will change based on the sql queries
router.post('/:id/answer', (req, res) => {
  const { answer, option } = req.body;
  editAnswers(answer, option)
    .then(quiz => {
      res.send('answer updated!');
    });
});

// for a quiz taker, to display results
// this will change based on the sql queries
router.post('/:id/score', (req,res) => {
  const { quiz_id, user_id } = req.body;
  console.log('user_id and quiz_id are', user_id, quiz_id);
  getScores(user_id, quiz_id)
    .then(score => {
      res.json(score);
    });
});

// Deleting answers from a quiz that the taker has done
router.post('/:id/delete', (req, res) => {
  const quiz_id = req.params.id;
  const user_id = req.body.user_id;
  takerDeleteQuiz(user_id, quiz_id)
    .then(quizzes => {
      console.log(quizzes);
      res.send('quiz deleted');
    });
});

module.exports = router;
