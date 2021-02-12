const express = require('express');
const router = express.Router();
const { getQuizzesByIdCreated, getQuizById, editQuiz, editQuestion, editOptions, postQuizzes, deleteQuiz, addQuestions, addOptions } = require('../db/queries/quiz-queries');
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
    });
});

router.post('/question', (req, res) => {
  const question = req.body;
  editQuestion(question)
    .then(quizzes => {
      res.json(quizzes);
    });
});

// this route still needs testing
router.post('/option', (req, res) => {
  const option = req.body;
  editOptions(option)
    .then(quizzes => {
      res.json(quizzes);
    });
});

// Adding a new quiz
// params: quiz, questions, options
router.post('/', (req, res) => {
  const quiz = req.body;
  // let arrayOfPromises = [];
  // arrayOfPromises.push(postQuizzes(quiz));
  // for (const question of quiz.questions) {
  //   arrayOfPromises.push(addQuestions(question));
  //   for (const option of question.options) {
  //     arrayOfPromises.push(addOptions(option));
  //   }
  // }
  /*
  postQuizzes(quiz)
    .then(() => {
      for (const question of quiz.questions) {
        addQuestions(question);
      }
    })
    .then(() => {
      for (const question of quiz.questions) {
        for (const option of question.options) {
          addOptions(option);
        }
      }
    })
    .then(() => res.send('quiz added!'));
    */
  // return Promise.all(arrayOfPromises)
  //   .then(() => res.send('quiz added!'));
});

const quiz = {
  user_id: 2,
  title: "Let us create a quiz from the frontend",
  is_public: false,
  is_current: true,
  questions: [
    {
      question: "Is it fun to use glue for hairspray?",
      sub_text: "I don't think so.",
      question_pic_url: "https://static01.nyt.com/images/2021/02/07/multimedia/07xp-gorillaglue/07xp-gorillaglue-jumbo.jpg?quality=90&auto=webp",
      options: [
        {
          pic_answer_url: null,
          text_answer: "No",
          is_correct: true
        },
        {
          pic_answer_url: null,
          text_answer: "Yes",
          is_correct: false
        }
      ]
    },
    {
      question: "Is Cats a good movie?",
      sub_text: "There are worse things.",
      question_pic_url: "https://media.vanityfair.com/photos/5e27310def889c00087c7928/4:3/w_1776,h_1332,c_limit/taylor-swift-cats.jpg",
      options: [
        {
          pic_answer_url: "https://media.vanityfair.com/photos/5e27310def889c00087c7928/4:3/w_1776,h_1332,c_limit/taylor-swift-cats.jpg",
          text_answer: "No",
          is_correct: true
        },
        {
          pic_answer_url: "https://s01.sgp1.cdn.digitaloceanspaces.com/article/133874-zhudebnztb-1577901144.jpeg",
          text_answer: "Yes",
          is_correct: false
        }
      ]
    }
  ]
};
postQuizzes(quiz)
  .then(() => {
    for (const question of quiz.questions) {
      addQuestions(question);
    }
  })
  .then(() => {
    for (const question of quiz.questions) {
      for (const option of question.options) {
        addOptions(option);
      }
    }
  });

// Deleting a quiz that the author made, sets is_current to false so it can be rendered as hidden
// params: quiz_id
router.post('/:id/delete', (req, res) => {
  const quiz_id = req.params.id;
  deleteQuiz(quiz_id)
    .then(quizzes => {
      res.send('quiz deleted!');
    });
});

module.exports = router;
