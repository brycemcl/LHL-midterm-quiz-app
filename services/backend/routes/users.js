/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { addUser } = require('../db/queries/user-queries');
const bodyParser = require('body-parser');

// use and set middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res) => {
  addUser(req.body)
    .then(users => res.json(users));
});

module.exports = router;
