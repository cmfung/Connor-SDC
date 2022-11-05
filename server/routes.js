const router = require('express').Router();
const questions = require('./controllers/questions');
const answers = require('./controllers/answers');
const photos = require('./controllers/photos');

router.get('/questions', questions.getAll);

module.exports = router;
