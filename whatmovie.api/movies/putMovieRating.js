const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const Exception = require('./domain/exception');
const createConnection = require('./database/createConnection');
const putEvents = require('./putEvents');

module.exports = (event, context, callback) => {

  try {

    if(!utils.hasValue(event.body)) {
      throw new Exception("Request body is empty");
    }
    
    const body = JSON.parse(event.body);    
    const movieId = body.movieId;
    const rating = body.rating;
    const genres = body.genres;
    const userId = utils.getUserId(event);
    
    if(!utils.hasValue(movieId)) {
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

        connection.query('INSERT INTO ratings (user_id, movie_id, rating) VALUES (?,?,?)', [userId, movieId, rating],
          function (error, results) {
            if (error) {
              connection.destroy();
              callback(null, new ApiResponse(500, JSON.stringify(error)));
            } else {                    
              connection.end(function (err) {
                if(err) {
                  callback(null, new ApiResponse(500, JSON.stringify(err)));
                } else {
                  putEvents(userId, movieId, rating, genres, '6a38e634-d16b-4577-92c7-a414b4d2dc1e')
                    .then(data => callback(null, new ApiResponse(200, JSON.stringify(data))))
                    .catch(error => callback(null, new ApiResponse(500, JSON.stringify(error))));               
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