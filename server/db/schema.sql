/* This file contains my database table designs for my postgres tables */

/* DROP PREVIOUS SCHEMAS IF THEY EXIST */
-- DROP TABLE IF EXISTS questions CASCADE;
-- DROP TABLE IF EXISTS answers CASCADE;
-- DROP TABLE IF EXISTS answerPhotos CASCADE;

/* TO RUN IN TERMINAL 'psql -U connorfung -d qadbase -a -f server/db/schema.sql' */

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT false,
  question_helpful INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL REFERENCES questions(question_id),
  answer_body VARCHAR(1000) NOT NULL,
  answer_date BIGINT NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  answer_reported BOOLEAN DEFAULT false,
  answer_helpful INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS answerPhotos (
  photo_id SERIAL PRIMARY KEY,
  answer_id INTEGER NOT NULL REFERENCES answers(answer_id),
  photo_url TEXT NOT NULL
);

ALTER TABLE questions ALTER COLUMN question_date TYPE TIMESTAMP USING to_timestamp(question_date/1000);

ALTER TABLE answers ALTER COLUMN answer_date TYPE TIMESTAMP USING to_timestamp(answer_date/1000);