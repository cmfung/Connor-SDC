const { Client } = require('pg');
// const Promise = require('bluebird');

// Sanity Check Here - check to make sure all of the env vars exist

const client = new Client ({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
})

client.connect()
  .then(() => console.log('\x1b[33m%s\x1b[0m', `Connected to Postgres DB on ${client.port}`))
  .catch((err) => console.log(err));

  module.exports = client;