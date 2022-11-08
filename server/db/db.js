const { Client, Pool } = require('pg');
require('dotenv').config();
// const Promise = require('bluebird');

// Sanity Check Here - check to make sure all of the env vars exist

// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
// });

// client.connect()
//   .then(() => console.log('\x1b[33m%s\x1b[0m', `Connected to Postgres DB on ${client.port}`))
//   .catch((err) => console.log(err));

// module.exports = client;

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

pool.connect()
  .then(() => console.log('\x1b[33m%s\x1b[0m', `Connected to Postgres DB on ${pool.options.port}`))
  .catch((err) => console.log(err, serverName, databaseName, portNumber, user, password));

module.exports = pool;
