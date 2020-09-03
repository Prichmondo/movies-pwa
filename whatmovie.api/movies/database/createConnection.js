const mysql = require('mysql2');
const utils = require('../utils');
const getSecret = require('../getSecret');

module.exports = async function (multiple){
  const databaseSecret = await getSecret('database-secret');
  const database = JSON.parse(databaseSecret);
  return mysql.createConnection({
    multipleStatements: utils.hasValue(multiple) ? multiple : false,
    host: database.host,
    port: database.port,
    user: database.username,
    password: database.password,
    database: database.dbname
  });
}