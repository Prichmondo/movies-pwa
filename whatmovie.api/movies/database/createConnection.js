const mysql = require('mysql2');
const utils = require('../utils');
const getSecret = require('../getSecret');

module.exports = async function (multiple){
  const databaseSecret = await getSecret('database-secret');
  const database = JSON.parse(databaseSecret);
  const connection = mysql.createConnection({
    multipleStatements: utils.hasValue(multiple) ? multiple : false,
    host: database.host,
    port: database.port,
    user: database.username,
    password: database.password,
    database: database.dbname
  });

  connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  };

  return connection;
}