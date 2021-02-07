DROP TABLE IF EXISTS options CASCADE;
CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  is_picture_option BOOLEAN NOT NULL DEFAULT TRUE,
  pic_answer_url VARCHAR(255),
  text_answer TEXT,
  is_answer BOOLEAN NOT NULL DEFAULT true
);
