DROP TABLE IF EXISTS options CASCADE;
CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  pic_answer_url VARCHAR(255),
  text_answer TEXT,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE --to set whether option is correct
);
