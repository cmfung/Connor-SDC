const models = require('../models/answers');

module.exports = {
  addAnswer: (req, res) => {
    models.addAnswer(req.query, req.params.question_id)
      .then((data) => res.status(201).send(data))
      .then((err) => res.status(400).send('Could not add answer'));
  },
  helpful: (req, res) => {
    models.markHelpful(req.params.answer_id)
      .then((data) => res.status(204).send('Successfully marked as helpful'))
      .catch((err) => res.status(400).send('Could not update'));
  },
  report: (req, res) => {
    models.reportAnswer(req.params.answer_id)
      .then((data) => res.status(204).send('Successfully reported'))
      .catch((err) => res.status(400).send('Could not report'));
  },
};
