const express = require('express');
const router = express.Router();

// All the quizzes that the user has made
router.get('/', (req, res) => {
  res.json({
    quizList: [
      { quiz1: 'quiz1' },
      { quiz2: 'quiz2' },
      { quiz3: 'quiz3' }
    ]
  });
});

// A specific quiz that the user has made (questions only)
router.get('/:id', (req, res) => {
  res.json({ quiz1: 'quiz1' });
});

// Editing a specific quiz
router.post('/:id', (req, res) => {
  res.json({ quiz1: 'changing the question' });
});

// Adding a new quiz
router.post('/', (req, res) => {
  res.json({ quiz1: 'adding a new quiz' });
});

// Deleting a quiz that the author made
router.delete('/:id', (req, res) => {
  res.send('Quiz about to be deleted');
});


module.exports = router;