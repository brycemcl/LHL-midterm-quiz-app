const db = require('../../lib/db');

// add the user
const addUser = function(user) {
  const userVals = [user.name];
  return db.query(`
    INSERT INTO users (name)
    VALUES ($1);
  `, userVals)
    .then(res => console.log('User added'));
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
