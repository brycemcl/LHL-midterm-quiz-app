const db = require('../../lib/db.js');

// gets all public and current quizzes for homepage
const getQuizzes = function() {
  return db.query(`
    SELECT * FROM quizzes
    WHERE is_public = true AND is_current = true;
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

//gets details for specic quiz given the id, someone is about to take quiz
const getQuizById = function(id) {
  return db.query(`
    SELECT * FROM quizzes
    WHERE id = ${id}
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
}

//getting all the quizzes a user has created
const getQuizzesByIdCreated = function(user_id) {
  return db.query(`
    SELECT * FROM quizzes
    WHERE user_id = ${user_id};
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

//geting all the quizzes a user has taken
const getQuizzesByIdTaken = function(user_id) {
  return db.query(`
    SELECT answers.quiz_id, quizzes.*
    FROM answers
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE answers.user_id = ${user_id};
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

// author creating a quiz
const postQuizzes = function(quiz) {
  //if the user_id exists then add quiz
  if (quiz.user_id) {
    const quiz_details = [quiz.user_id, quiz.title, quiz.version, quiz.is_current]
    const newId = Math.floor(Math.random() * 100);
    quiz.id = newId; // add new id into quiz
    return db.query(`
      INSERT INTO quizzes (id, user_id, title, version, is_current)
      VALUES (${quiz.id}, $1, $2, $3, $4)
      RETURNING *;
    `, quiz_details)
    .then(res => res.rows[0])
    .catch(err => err.stack)
  }
};

// author edit the quiz's title and change the version
const editQuiz = function(quiz) {
  const changes = [quiz.title, quiz.id];
  return db.query(`
    UPDATE quizzes
    SET title = $1, version = (version + 0.1)
    WHERE id = $2
    RETURNING *;
  `, changes)
  .then(res => res.rows)
  .catch(err => err.stack)
};

// author updating a question of their quiz
const editQuestion = function(question) {
  const keys = ['question', 'sub_text', 'question_pic_url', 'id'];
  const vals = keys.map(key => question[key]); //undefined if not there
  return db.query(`
    with versionUpdate as (
      UPDATE quizzes
      SET version = (version + 0.1)
      WHERE id IN (SELECT quiz_id FROM questions WHERE id = $4)
    )
    UPDATE questions
    SET question = coalesce($1, question),
    sub_text = coalesce($2, sub_text),
    question_pic_url = coalesce($3, question_pic_url)
    WHERE id = $4
    RETURNING *;
  `, vals)
  .then(res => res.rows[0]) //catch in function where routes are
};

// author updating the options
const editOptions = function(options) {
  const keys = ['pic_answer_url', 'text_answer', 'is_correct', 'answer_id', 'id', 'question_id'];
  const vals = keys.map(key => options[key]); //undefined if not there
  return db.query(`
    with versionUpdate as (
      UPDATE quizzes
      SET version = (version + 0.1)
      WHERE id IN (SELECT quiz_id FROM questions WHERE id = $6)
    )
    UPDATE options
    SET pic_answer_url = coalesce($1, pic_answer_url),
    text_answer = coalesce($2, text_answer),
    is_correct = coalesce($3, is_correct)
    WHERE id = $4
    RETURNING *;
  `, vals)
  .then(res => res.rows[0]) //catch in function where routes are
};

// quiz taker editting their answer (user_id included in the answer)
const editAnswers = function(answer, option_id) {
  const keys = ['id', 'user_id', 'question_id', 'quiz_id'];
  const vals = keys.map(key => answer[key]); //undefined if not there
  //delete this answer and make new answer and change answer_id under the option selected
  return db.query(`
    with optionRemove as (
      UPDATE options
      SET answer_id = null
      WHERE answer_id = $1
    )
    UPDATE options
    SET answer_id = $1
    WHERE id = ${option_id}
    RETURNING *;
  `, vals)
  .then(res => res.rows[0])
}

// author: mark the quiz to be hidden and not accessble to both author and quiz takers
const deleteQuiz = function(quiz_id) {
  return db.query(`
    UPDATE quizzes
    SET is_current = false
    WHERE id = ${quiz_id};
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

// deletes all the users answers associated with specifed user and quiz
const takerDeleteQuiz = function(user_id, quiz_id) {
  return db.query(`
    DELETE FROM answers
    WHERE quiz_id = ${quiz_id} AND user_id = ${user_id}
  `)
    .then((res) => res.rows);
};

// limited to one correct option per answer
// if more than one option, need to group by answers and then select COUNT(answers)
const getScores = function(user_id, quiz_id) {
  return db.query(`
    SELECT COUNT(options)
    FROM options
    JOIN answers ON answers.id = answer_id
    WHERE options.is_correct = TRUE
    AND answers.user_id = $1
    AND answers.quiz_id = $2;
  `, [user_id, quiz_id]);
}

module.exports = {
  getQuizzes,
  getQuizById,
  getQuizzesByIdCreated,
  getQuizzesByIdTaken,
  postQuizzes,
  editQuiz,
  editQuestion,
  editOptions,
  editAnswers,
  deleteQuiz,
  takerDeleteQuiz
};
