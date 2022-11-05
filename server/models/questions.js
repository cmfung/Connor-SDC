const db = require('../db/db');

module.exports = {
  getQuestions: (productID) => {
    const questionQueryString = `SELECT question_id, product_id, question_body, question_date, asker_name, question_helpful FROM questions WHERE product_id = ${productID} AND reported = false`;
    return db.query(questionQueryString);
  },
  getQandA: async (productID) => {
    // create a result object (see API for shape)
    const result = {
      product_id: productID,
      results: [],
    };
    // get all the questions associated with the input productID (json aggregate into an array)
    const resultObjects = [];

    const questionQueryString = `SELECT * FROM questions WHERE product_id = ${productID} AND reported = false`;

    await db.query(questionQueryString)
      .then((data) => {
        data.rows.forEach((item) => resultObjects.push(item));
      })
      .catch((err) => console.log(err));

    const QandA = await Promise.all(resultObjects.map((item) => {
      const answerQuery = `SELECT * FROM answers WHERE question_id = ${item.question_id} AND answer_reported = false`;
      return db.query(answerQuery);
    }));

    const allAnswers = QandA.map((item) => item.rows);

    resultObjects.forEach((obj, i) => {
      const answersObj = {};
      for (let answerI = 0; answerI < allAnswers[i].length; answerI++) {
        answersObj[allAnswers[i][answerI].answer_id] = allAnswers[i][answerI];
      }
      obj.answers = answersObj;
    });

    result.results = resultObjects;

    return new Promise((res, rej) => res(result));
  },
  // POST question
  // PUT helpful
  // PUT report
};
