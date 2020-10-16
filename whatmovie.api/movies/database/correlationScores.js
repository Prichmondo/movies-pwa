const createConnection = require('./createConnection');
const mysql = require('mysql2');
const { hasValue } = require('../utils');

module.exports.updateUserCorrelationScores = async function(userId, userScores) {
  
  return new Promise((resolve, reject) => {

    if(!hasValue(userId)) {
      reject({ message: "updateUserCorrelationScores - userId is not valid" })
    }

    if(!Array.isArray(userScores) ||  userScores.length === 0) {
      reject({ message: "updateUserCorrelationScores - no user score to update" })
    }

    const values = userScores.map(s => `(${mysql.escape(userId)},${mysql.escape(s.userId)},${mysql.escape(s.score)})`)

    const query = `
      INSERT INTO usersCorrelationScores (user_id,other_user_id,score) 
      VALUES ${values}
      ON DUPLICATE KEY UPDATE score=VALUES(score);
    `;
    
    createConnection()
      .then(function (connection) {
        connection.query(query, [],
          function (error, result) {
            if (error) {
              connection.destroy();
              reject(error);
            } else {
              
              connection.end(function (error) {
                if(error) {
                  reject(error);
                } else {
                  resolve(userScores);
                }
              });
            }
        });
      })
      .catch(function(error){
        reject(error);
      });
    });  
}