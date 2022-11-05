require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 3000;

const router = require('./routes');

const app = express();
app.use(express.json());

/* Set up Routes */

app.use('/qa', router);

app.listen(PORT, () => { console.log(`Listening at http://localhost:${PORT}`); });
