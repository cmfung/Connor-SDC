/* This file contains my database table designs for my postgres tables */
CREATE TABLE [IF NOT EXISTS] questions (
  question_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date INTEGER NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT false,
  question_helpful INTEGER NOT NULL,
)

CREATE TABLE [IF NOT EXISTS] answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL,
  answer_body VARCHAR(1000) NOT NULL,
  answer_date INTEGER NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  answer_reported BOOLEAN DEFAULT false,
  answer_helpful INTEGER NOT NULL,
)

CREATE TABLE [IF NOT EXISTS] answerPhotos (
  photo_id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL,
  photo_url TEXT NOT NULL,
)