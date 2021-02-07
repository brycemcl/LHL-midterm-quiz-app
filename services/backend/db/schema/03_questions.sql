DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  sub_text TEXT,
  question_pic_url VARCHAR(255)
);
