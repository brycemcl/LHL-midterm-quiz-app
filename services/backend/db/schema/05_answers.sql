DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE
);

-- SELECT answers.option_selected_id, options.is_answer
-- FROM answers
-- JOIN options ON answer_id = answers.id

-- 4 options 3/4 are right

-- // select all options that a user selected for a question_id
-- // given a user_id: 5

-- SELECT options.text_answer
-- FROM answers
-- WHERE user_id = 5
-- JOIN options ON option_id = options.id
-- WHERE options.is_selected = TRUE;
