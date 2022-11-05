const db = require('../db/db');

module.exports = {
  // GET ANSWERS
  // POST ANSWERS
  addAnswer: (newAnswer, questionID) => {
    const inputs = Object.values(newAnswer);
    const queryString = `INSERT INTO answers (question_id, answer_body, answer_date, answerer_name, answerer_email, answer_reported, answer_helpful) VALUES (${questionID}, $1, current_timestamp, $2, $3, false, 0)`;
    return db.query(queryString, inputs);
  },
  // PUT - Mark Helpful
  markHelpful: (answerID) => {
    const queryString = `UPDATE answers SET answer_helpful = answer_helpful + 1 WHERE answer_id = ${answerID}`;
    return db.query(queryString);
  },
  // PUT - Report Answer
  reportAnswer: (answerID) => {
    const queryString = `UPDATE answers SET answer_reported = true WHERE answer_id = ${answerID}`;
    return db.query(queryString);
  },
};
