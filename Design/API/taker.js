const express = require('express');
const router = express.Router();

// TODO

// All the quizzes that the user can take (public or shared)
router.get('/', (req, res) => {
  res.json({
    quizList: [
      { quiz1: 'quiz1' },
      { quiz2: 'quiz2' },
      { quiz3: 'quiz3' }
    ]
  });
});

// Get a specific quiz
router.get('/:id', (req, res) => {
  res.json({ quiz1: 'hello' });
});

// Edit a quiz (answers only)
router.post('/:id', (req, res) => {
  res.json({ quiz1: 'changing answers' });
});

// Submit a completed quiz
router.post('/', (req, res) => {
  res.json({ newQuiz: 'quiz submitted' });
});

// Delete a submitted quiz
router.delete('/:id', (req, res) => {
  res.send('Quiz about to be deleted');
});

module.exports = router;