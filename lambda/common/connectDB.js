require("dotenv").config();
const mysql = require("mysql2/promise");

// console.log(process.env.HOST)
// console.log(process.env.DB_USERNAME)
// console.log(process.env.DB_PASSWORD)

async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "crDB"
  });

  return connection;
}

module.exports = { getConnection }