require('dotenv').config();
const express = require('express');
const db = require('./db/db.js');
const app = (express());

app.use(express.json());

// Set up Routes

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);