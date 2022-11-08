const db = require('../db/db');

module.exports = {
  getOne: (questionID) => {
    const questionQueryString = `SELECT * FROM questions WHERE question_id = ${questionID}`;
    return db.query(questionQueryString);
  },
  getQandA: async (productID, page, count) => {
    // create a result object (see API for shape)
    const result = {
      product_id: productID,
      results: [],
    };
    // get all the questions associated with the input productID (json aggregate into an array)
    let resultObjects = [];

    const questionQueryString = `SELECT * FROM questions WHERE product_id = ${productID} AND reported = false`;

    await db.query(questionQueryString)
      .then((data) => {
        resultObjects = data.rows;
        // data.rows.forEach((item) => resultObjects.push(item));
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
  // GET request to add a new question
  addQuestion: (newQuestion) => {
    const inputs = Object.values(newQuestion);
    const addQuestQuery = 'INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpful) VALUES ($4, $1, current_timestamp, $2, $3, false, 0)';
    return db.query(addQuestQuery, inputs);
  },
  // mark a question as helpful
  markHelpful: (questionID) => {
    const queryString = `UPDATE questions SET question_helpful = question_helpful + 1 WHERE question_id = ${questionID}`;
    return db.query(queryString);
  },
  // report a question
  reportQuestion: (questionID) => {
    const queryString = `UPDATE questions SET reported = true WHERE question_id = ${questionID}`;
    return db.query(queryString);
  },
  getQandASubQuery: (productID, page, count) => {
    const offset = (page - 1) * count;
    const queryString = `SELECT json_agg(resultArr) FROM (SELECT json_build_object(
      'question_id', question_id,
      'question_body', question_body,
      'question_date', question_date,
      'asker_name', asker_name,
      'question_helpfullness', question_helpful,
      'answers', (SELECT json_object_agg(
        answer_id, (SELECT COALESCE(json_build_object(
          'id', answer_id,
          'body', answer_body,
          'date', answer_date,
          'answerer_name', answerer_name,
          'helpfulness', answer_helpful,
          'photos', (SELECT COALESCE (json_agg(
            json_build_object(
              'id', photo_id,
              'url', photo_url
            )), '[]')
          FROM answerPhotos WHERE answerPhotos.answer_id = answers.answer_id)
        ), '{}'))
      ) FROM answers WHERE answers.question_id = questions.question_id)
    ) AS resultArr FROM questions WHERE questions.product_id = ${productID} LIMIT ${count} OFFSET ${offset}) AS res`;
    return db.query(queryString);
  },
};
