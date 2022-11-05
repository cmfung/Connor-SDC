const models = require('../models/questions');

module.exports = {
  getAll: (req, res) => {
    models.getQandA(req.query.productID)
      .then((questionData) => {
        // console.log(questionData);
        res.status(200).send(questionData);
      })
      .catch((err) => console.log(err));
  },
};
