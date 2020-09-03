const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const Exception = require('./domain/exception');
const createConnection = require('./database/createConnection');

module.exports = (event, context, callback) => {

  try {

    event.body = JSON.stringify({
    	"mvoieId": 20,
      "rating": 5
    });

    if(!utils.hasValue(event.body)) {
      throw new Exception("Request body is empty");
    }
    
    const body = JSON.parse(event.body);
    
    const mvoieId = body.mvoieId;
    const rating = body.rating;
    const userId = '094f3cd0-1989-4bb9-a43a-98cf50d07a01'; // event.requestContext.authorizer.claims.sub;
    
    if(!utils.hasValue(mvoieId)) {
      throw new Exception("Movie ID is empty");
    }
    
    if(!utils.hasValue(rating)) {
      throw new Exception("Rating is empty");
    }
    
    if(!utils.hasValue(userId)) {
      throw new Exception("User not authorizer");
    }
    
    createConnection()
      .then(function (connection) {

        connection.query('INSERT INTO ratings (user_id, movie_id, rating) VALUES (?,?,?)', [userId, mvoieId, rating],
          function (error, results) {
            if (error) {
              connection.destroy();
              callback(null, new ApiResponse(500, JSON.stringify(error)));
            } else {                    
              connection.end(function (err) {
                if(err) {
                  callback(null, 
                    new ApiResponse(500, JSON.stringify(err))
                  );
                } else {
                  callback(null, 
                    new ApiResponse(200, JSON.stringify(results))
                  );
                }
              });
            }
        });
        
      })
      .catch(function (error){
        callback(null, 
          new ApiResponse(200, JSON.stringify(error))
        );
      });
  } catch (error) {
    callback(null,
      new ApiResponse(500, JSON.stringify(error))
    );
  }

};