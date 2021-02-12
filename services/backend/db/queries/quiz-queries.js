const db = require('../../lib/db.js');

// gets all public and current quizzes for homepage
const getQuizzes = function () {
  return db.query(`
    SELECT * FROM quizzes
    WHERE is_public = true AND is_current = true;
  `)
    .then(res => res.rows);
};

//gets details for specific quiz given the id, someone is about to take quiz
const getQuizById = function (id) {
  return db.query(`
    SELECT * FROM quizzes
    WHERE id = $1
  `, [id])
    .then(res => res.rows);
};

//getting all the quizzes a user has created
const getQuizzesByIdCreated = function (user_id) {
  return db.query(`
    SELECT * FROM quizzes
    WHERE user_id = $1;
  `, [user_id])
    .then(res => res.rows);
};

//getting all the quizzes a user has taken
//paraminput = {id, user_id: integer, title: string, version: integer, is_current: bool}
const getQuizzesByIdTaken = function (user_id) {
  return db.query(`
    SELECT answers.quiz_id, quizzes.*
    FROM answers
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE answers.user_id = $1;
  `, [user_id])
    .then(res => res.rows);
};

// author creating a quiz
const postQuizzes = function (quiz) {
  //if the user_id exists then add quiz
  if (quiz.user_id) {
    const newId = Math.floor(Math.random() * 100);
    quiz.id = newId; // add new id into quiz
    const quiz_details = [quiz.id, quiz.user_id, quiz.title, quiz.version, quiz.is_current];
    return db.query(`
      INSERT INTO quizzes (id, user_id, title, version, is_current)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, quiz_details)
      .then(res => res.rows[0]);
  }
};

const addQuestions = function (questions) {
  const question_keys = ['id', 'quiz_id', 'question', 'sub_text', 'question_pic_url'];
  const vals = question_keys.map(key => questions[key]); //undefined if not there
  return db.query(
    `
    INSERT INTO questions (id, quiz_id, question, sub_text, question_pic_url) 
    VALUES (
      coalesce($1, null),
      coalesce($2, null),
      coalesce($3, null),
      coalesce($4, null),
      coalesce($5, null)
      )
    `, vals)
    .then(res => res.rows[0]);
};

const addOptions = function (options) {
  const option_keys = ['id', 'question_id', 'pic_answer_url', 'text_answer', 'is_correct'];
  const vals = option_keys.map(key => options[key]); //undefined if not there
  return db.query(`
    INSERT INTO options (id, question_id, pic_answer_url, text_answer, is_correct)
    VALUES (
      coalesce($1, null),
      coalesce($2, null),
      coalesce($3, null),
      coalesce($4, null),
      coalesce($5, null)
    )
  `, vals)
    .then(res => res.rows[0]);
};
const getQuestions = function (quiz_id) {
  return db.query(`
    SELECT id, question, sub_text, question_pic_url
    FROM questions
    WHERE quiz_id = $1;
  `, [quiz_id])
    .then(res => res.rows);
};

const getQuestion = function (question_id) {
  return db.query(`
    SELECT question
    FROM questions
    WHERE id = $1;
  `, [question_id])
    .then(res => res.rows);
};

//gets specific question given quiz
const getOptions = function (question_id) {
  return db.query(`
    SELECT pic_answer_url, text_answer
    FROM options
    WHERE question_id IN (SELECT id FROM questions WHERE id = $1)
  `, [question_id])
    .then(res => res.rows);
};

// author edit the quiz's title and change the version
const editQuiz = function (quiz) {
  const changes = [quiz.title, quiz.id];
  return db.query(`
    UPDATE quizzes
    SET title = $1, version = (version + 0.1)
    WHERE id = $2
    RETURNING *;
  `, changes)
    .then(res => res.rows);
};

// author updating a question of their quiz
const editQuestion = function (question) {
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
    .then(res => res.rows[0]); //catch in function where routes are
};

// author updating the options
// required field: question_id, id (option)
// editOptions end point not working
const editOptions = function (options) {
  const keys = ['pic_answer_url', 'text_answer', 'is_correct', 'id', 'question_id'];
  const vals = keys.map(key => options[key]); //undefined if not there
  return db.query(`
    with versionUpdate as (
      UPDATE quizzes
      SET version = (version + 0.1)
      WHERE id IN (SELECT quiz_id FROM questions WHERE id = $5)
    )
    UPDATE options
    SET pic_answer_url = coalesce($1, pic_answer_url),
    text_answer = coalesce($2, text_answer),
    is_correct = coalesce($3, is_correct)
    WHERE id = $4
    RETURNING *;
  `, vals)
    .then(res => res.rows[0]); //catch in function where routes are
};


//needs the answer thats being changed and new option_id
const editAnswers = function (changesObject, option_id) {
  const keys = ['id', 'user_id'];
  let vals = keys.map(key => changesObject[key]); //undefined if not there;
  vals.push(option_id);
  // console.log('vals are:', vals);
  //delete this answer and make new answer and change answer_id under the option selected
  return db.query(`
    UPDATE options_answers
    SET option_id = $3
    WHERE answer_id IN (SELECT answers.id FROM answers WHERE id = $1 AND user_id = $2);
  `, vals)
    .then(res => res.rows);
};


// author: mark the quiz to be hidden and not accessble to both author and quiz takers
const deleteQuiz = function (quiz_id) {
  return db.query(`
    UPDATE quizzes
    SET is_current = false
    WHERE id = $1;
  `, [quiz_id])
    .then(res => res.rows);
};

// deletes all the users answers associated with specifed user and quiz
const takerDeleteQuiz = function (user_id, quiz_id) {
  return db.query(`
    DELETE FROM answers
    WHERE quiz_id = $1 AND user_id = $2
  `, [quiz_id, user_id])
    .then((res) => res.rows);
};

// limited to one correct option per answer
// if more than one option, need to group by answers and then select COUNT(answers)
const getScores = function (user_id, quiz_id) {
  return db.query(`
  WITH cte1 AS (SELECT COUNT(is_correct) as questions_correct FROM options
  WHERE is_correct = true AND options.id IN (SELECT option_id FROM options_answers WHERE answer_id IN (
    SELECT id FROM answers WHERE user_id = $1 AND quiz_id = $2
    )
    )
  ) , cte2 AS (SELECT COUNT(*) as out_of FROM questions WHERE quiz_id = $2)
  SELECT (cte1.questions_correct * 100) / cte2.out_of as percentage FROM
  cte1, cte2;

  `, [user_id, quiz_id])
    .then((res) => res.rows);
};

module.exports = {
  getQuizzes,
  getQuizById,
  getQuizzesByIdCreated,
  getQuizzesByIdTaken,
  postQuizzes,
  addQuestions,
  addOptions,
  editQuiz,
  editQuestion,
  editOptions,
  editAnswers,
  takerDeleteQuiz,
  deleteQuiz,
  getScores,
  getQuestion,
  getOptions,
  getQuestions
};

