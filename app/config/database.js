const { createPool } = require("mysql");
require("dotenv").config();

let proEnv = process.env;
const pool = createPool({
  port: proEnv.DB_PORT,
  host: proEnv.DB_HOST,
  user: proEnv.DB_USER,
  password: proEnv.DB_PASSWORD,
  database: proEnv.MYSQL_DB
})

module.exports = pool;