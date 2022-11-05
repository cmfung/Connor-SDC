const models = require('../models/questions');

module.exports = {
  getOne: (req, res) => {
    models.getOne(req.params.question_id)
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(400).send('Could not get Question'));
  },
  getAllByPID: (req, res) => {
    models.getQandA(req.query.productID, req.query.page, req.query.count)
      .then((questionData) => res.status(200).send(questionData))
      .catch((err) => res.status(400).send('Unable to get questions'));
  },
  postQuestion: (req, res) => {
    models.addQuestion(req.body)
      .then((data) => res.status(201).send(data))
      .catch((err) => res.status(400).send('Unable to add question'));
  },
  helpful: (req, res) => {
    models.markHelpful(req.params.question_id)
      .then((data) => res.sendStatus(204))
      .catch((err) => res.status(400).send('Unable to mark as helpful'));
  },
  report: (req, res) => {
    models.reportQuestion(req.params.question_id)
      .then((data) => res.sendStatus(204))
      .catch((err) => res.status(400).send('Unable to report question'));
  },
};
