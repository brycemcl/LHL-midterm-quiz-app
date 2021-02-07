const express = require('express');
const router = express.Router();

// All the quizzes that the user can take (public or shared)
router.get('/', (req, res) => {
});

// Get a specific quiz
router.get('/:id', (req, res) => {
});

// Edit a quiz (answers only)
router.post('/:id', (req, res) => {
});

// Submit a completed quiz
router.post('/', (req, res) => {
});

// Delete a submitted quiz
router.delete('/:id', (req, res) => {
});

module.exports = router;
