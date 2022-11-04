require('dotenv').config();
const express = require('express');
const db = require('./db/db.js');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

/* Set up Routes */

// GET - questions by Product_ID
// GET - answers by Question_ID
// POST - question
// POST - answer
// PUT - mark question as helpful
// PUT - report question
// PUT - mark answer as helpful
// PUT - report answer

app.listen(PORT, () => { console.log(`Listening at http://localhost:${PORT}`) });