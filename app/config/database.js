const { createPool } = require("mysql");

//let proEnv = process.env;
const pool = createPool({
  port: 3306,
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7364401',
  password: 'VEfAew6QHe',
  database: 'sql7364401'
})

module.exports = pool;