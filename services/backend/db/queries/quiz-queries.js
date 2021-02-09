db.connect();

//gets all public and current quizzes for homepage
const getQuizzes = function() {
  return db.query(`
  SELECT * FROM quizzes
  WHERE is_public = true AND is_current = true;
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

//gets details for specic quiz given the id
const getQuizById = function(id) {
  return db.query(`
  SELECT * FROM quizzes
  WHERE id = ${id}
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
}

//getting all the quizzes a user has created
const getQuizzesByIdCreated = function(id) {
  return db.query(`
  SELECT * FROM quizzes
  WHERE user_id = ${id};
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

//geting all the quizzes a user has taken
const getQuizzesByIdTaken = function(id) {
  return db.query(`
  SELECT answers.quiz_id, quizzes.*
  FROM answers
  JOIN quizzes ON quiz_id = quizzes.id
  WHERE answers.user_id = ${id};
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

const addUser = function(user) {
  const userVals = [user.name];
  return pool.query(`
  INSERT INTO users (name)
  VALUES ($1);
  `, userVals)
    .then(res => res.rows[0])
    .catch(err => err.stack);
};

//paraminput = {id, user_id: integer, title: string, version: interger, is_current: bool}
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

//{id, user_id: integer, title: string, version: interger, is_current: bool}
const editQuiz = function(changesObject) {
  const changes = [changesObject.title, changesObject.id];
  return db.query(`
  UPDATE quizzes
  SET title = $1, version = (version + 0.1)
  WHERE id = $2
  RETURNING *;
  `, changes)
  .then(res => res.rows)
  .catch(err => err.stack)
};

//{id: INT, quiz_id: INT, question: TEXT, sub_text: question, question_pic_url: VARCHAR(255)}
const editQuestion = function(changesObject) {
  const keys = ['question', 'sub_text', 'question_pic_url', 'id'];
  const vals = keys.map(key => changesObject[key]); //undefined if not there
  return db.query(`
  with version as (
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

//{id: INT, question_id, pic_answer_url, text_answer, is_correct, answer_id}
const editOptions = function() {
  const keys = [ 'id'];
  const vals = keys.map(key => changesObject[key]); //undefined if not there
};

//{id, user_id, question_id, quiz_id, selected_option_id}
const editAnswers = function() {
  return db.query(`
  UPDATE answers
  SELECT answers.quiz_id, quizzes.*
  FROM answers
  JOIN quizzes ON quiz_id = quizzes.id
  WHERE answers.user_id = ${id}
  SET ;
  `)
}

//makes quiz no longer current so it can be hidden
const deleteQuiz = function(id) {
  return db.query(`
  UPDATE quizzes
  SET is_current = false
  WHERE id = ${id};
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

module.exports = {
  getQuizzes,
  getQuizById,
  getQuizzesByIdCreated,
  getQuizzesByIdTaken,
  addUser,
  postQuizzes,
  editQuiz,
  editQuestion,
  editOptions,
  editAnswers,
  deleteQuiz
};



