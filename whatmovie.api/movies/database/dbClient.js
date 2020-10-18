const createConnection = require('./createConnection');

module.exports.query = async function(query, params = [], multiple = false){

  return new Promise((resolve, reject) => {

    createConnection(multiple)
      .then(function (connection) {

        connection.query(query, params,
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
};