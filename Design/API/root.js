const express = require('express');
const router = express.Router();

// Get all the public quizzes
router.get('/', (req, res) => {
  res.json({
    userId: 1,
    quizList: [
      {
        title: 'quiz 1'
      },
      {
        title: 'quiz 2'
      },
      {
        title: 'quiz 3'
      }
    ]
  });
});

// Getting a specific quiz (stay?)
router.get('/:id', (req, res) => {
  res.json({
    quiz: {
      title: 'quiz 1'
    }
  });
});


module.exports = router;