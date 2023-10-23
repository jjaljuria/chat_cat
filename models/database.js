
const config = require('../config')

const pool = mariadb.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  connectionLimit: 5
})

module.exports = { pool }
