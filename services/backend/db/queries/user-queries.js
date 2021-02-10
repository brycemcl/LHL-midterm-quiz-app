const db = require('../../lib/db');

// add the user
const addUser = function(user) {
  const userVals = [user.name];
  console.log('about to be added and this is', user.name);
  return db.query(`
    INSERT INTO users (name)
    VALUES ($1)
    RETURNING *;
  `, userVals)
    .then(res => {
      console.log('this is res', res.rows);
      return res.rows;
    });
};

// get a user for displaying
const getUserById = function(user) {
  return db.query(`
    SELECT name
    FROM users
    WHERE users.id = $1
  `, [user.id])
    .then(res => res.rows[0]);
};

module.exports = {
  addUser
}
