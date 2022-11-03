const mongoose = require('mongoose');
const { Schema } = mongoose;

// possible to use array of SchemaTypes for related_answers and related_photos?

const questionSchema = new Schema({
  question_id: { type: Number, unique: true},
  product_id: { type: Number, required: true},
  question_body: { type: String, required: true },
  question_date: { type: Number, required: true},
  asker_name: { type: String, required: true },
  asker_email: { type: String, required: true },
  reported: { type: Boolean, default: false },
  question_helpful: { type: Number, required: true},
  related_answers: [Number]
})

const answerSchema = new Schema ({
  answer_id: { type: Number, unique: true},
  question_id: { type: Number, required: true},
  answer_body: { type: String, required: true },
  answer_date: { type: Number, required: true},
  answerer_name: { type: String, required: true },
  answerer_email: { type: String, required: true },
  answer_reported: { type: Boolean, default: false }
  answer_helpful: { type: Number, required: true},
  related_photos: [Number]
})

const photoSchema = new Schema ({
  photo_id: { type: Number, unique: true},
  question_id: { type: Number, required: true},
  photo_url: { type: String, required: true }
})