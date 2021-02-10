DROP TABLE IF EXISTS options CASCADE;
CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  pic_answer_url VARCHAR(255),
  text_answer TEXT,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE --to set whether option is correct
  -- answer_id INT REFERENCES answers(id) ON DELETE CASCADE
);

-- option id: 1 answer_14
-- options id: 2 answer_14
-- //where answer_id = 14

--
-- SELECT
-- FROM options.id
-- JOIN questions ON quetions.id = question_id
-- JOIN answers ON answers.id = answer_id
-- WHERE options.is_correct IS TRUE And queston.id = ?
-- 13,14,15

-- option.id
-- WHERE is_selected AND
-- answers.user_id = 5;
-- 13, 14, 15

