const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const createConnection = require('./database/createConnection');
const mysql = require('mysql2');

module.exports = (event, context, callback) => {

  let movieId = utils.getQuerystringParam(event, 'movieId', 0);
  let userId = utils.getUserId(event);

  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }

  if(!movieId) {
    callback(null, new ApiResponse(401, "Unknown movie"));
  }
  
  const query = `
    SELECT mo.*, AVG(ra.rating) as avgRating, ura.rating as userRating,
    CASE 
      WHEN wl.movie_id IS NULL THEN false
      ELSE true
    END AS watchlist
    FROM movies AS mo
    JOIN ratings AS ra ON ra.movie_id = mo.id
    LEFT JOIN ratings AS ura ON ura.user_id = :userId AND ura.movie_id = mo.id
    LEFT JOIN wishlist AS wl ON wl.user_id = :userId AND wl.movie_id = mo.id
    WHERE mo.id = :movieId
    GROUP BY mo.id
    ORDER BY mo.title
  `;

  const params = {
    userId: userId,
    movieId: movieId
  }

  createConnection()
    .then(function (connection) {
      connection.query(query, params,
        function (error, results) {
          if (error) {
            connection.destroy();
            callback(null, new ApiResponse(500, JSON.stringify(error)));
          } else {

            if(results.length === 0) {
              callback(null, new ApiResponse(404, JSON.stringify(null)));
            } else {
              const movie = results[0];
              connection.end(function (err) {
                callback(null, new ApiResponse(200, JSON.stringify(movie)));
              });
            }            
          }
      });
    })
    .catch(function(error){
      callback(null, new ApiResponse(500, JSON.stringify(error)));
    });

};