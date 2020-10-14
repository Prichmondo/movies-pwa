const createConnection = require('../database/createConnection');
const mysql = require('mysql2');
const { hasValue } = require('../utils');

module.exports.updateSimilarities = async function(userId, similarities) {
  
  return new Promise((resolve, reject) => {

    if(!hasValue(userId)) {
      reject({ message: "updateSimilarities - userId is not valid" })
    }

    if(!Array.isArray(similarities) ||  similarities.length === 0) {
      reject({ message: "updateSimilarities - no similarities to update" })
    }

    const values = similarities.map(s => `(${userId},${s.userId},${s.score})`)

    const query = `
      INSERT INTO similarities (user_id,other_user_id,score) 
      VALUES ${mysql.escape(values.join(','))}
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
                  resolve(result);
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