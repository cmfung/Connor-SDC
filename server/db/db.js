const { Client } = require('pg');
// const Promise = require('bluebird');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.port,

})

client.connect();