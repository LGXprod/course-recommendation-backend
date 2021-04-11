require("dotenv").config();
const mysql = require("mysql2");
const util = require('util');

// console.log(process.env.HOST)
// console.log(process.env.DB_USERNAME)
// console.log(process.env.DB_PASSWORD)

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "crDB"
});

const query = util.promisify(connection.query).bind(connection);

module.exports = { connection, query }