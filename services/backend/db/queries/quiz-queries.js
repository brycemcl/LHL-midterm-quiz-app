db.connect();

const getQuizzes = function() {
  return db.query(`
  SELECT * FROM quizzes;
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

const getQuizzesById = function(id) {
  return db.query(`
  SELECT * FROM quizzes
  WHERE users_id = '${id}';
  `)
  .then(res => res.rows)
  .catch(err => err.stack)
};

//paraminput = {user_id: integer, title: string, version: interger, is_current: bool}
const postQuizzes = function(quiz) {
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
};

//changes = {user_id: integer, title: string, version: interger, is_current: bool}
const editQuiz = function(quiz_id, changes) {
  return db.query(`
  UPDATE quizzes
  SET user_id = user_id, title =
  WHERE id = quiz_id
  `)
};

const editQuestion = function() {

}

const editOptions = function() {

}

const editAnswers = function() {

}

const deleteQuiz = function(id) {
  SELECT * FROM
  if (db[id]) {
    delete db[id];
    return db;
  }
};

module.exports = {
  getQuizzes,
  getQuizzesById,
  postQuizzes,
  editQuiz,
  deleteQuiz
};
