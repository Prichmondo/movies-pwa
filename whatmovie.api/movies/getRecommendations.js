const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const AWS = require('aws-sdk');
const createConnection = require('./database/createConnection');
const mysql = require('mysql2');
const mapMovieResponse = require('./mapMovieResponse');

module.exports = (event, context, callback) => {

  let itemsPerPage = utils.getQuerystringParam(event, 'itemsPerPage', 20);
  let currentPage = utils.getQuerystringParam(event, 'currentPage', 0);
  let userId = utils.getUserId(event);
  
  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }  

  // Personalize request parameters
  var params = {
    campaignArn: 'arn:aws:personalize:eu-west-1:647974117295:campaign/movies-campaign',
    numResults: 100,
    userId: userId,
    // context: {}, //used for passing contextual params
  };
  
  var personalizeruntime = new AWS.PersonalizeRuntime();

  personalizeruntime.getRecommendations(params, function (error, data) {
    
    if (error) {
      reject(error);
    }
    else 
    {

      const itemsList = data.itemList.map(r => r.itemId).join(',');
      const where = `WHERE id IN (${itemsList})`;

      const query = `
        SELECT COUNT(*) as total FROM movies AS mo ${where};
        SELECT mo.*, ura.rating as userRating, AVG(ra.rating) as avgRating,
        CASE 
          WHEN wl.movie_id IS NULL THEN false
          ELSE true
        END AS watchlist
        FROM movies AS mo
        JOIN ratings AS ra ON ra.movie_id = mo.id
        LEFT JOIN ratings AS ura ON ura.user_id = ${mysql.escape(userId)} AND ura.movie_id = mo.id
        LEFT JOIN wishlist AS wl ON wl.user_id = ${mysql.escape(userId)} AND wl.movie_id = mo.id
        ${where}
        GROUP BY FIELD(mo.id, ${itemsList})
        LIMIT ${mysql.escape(itemsPerPage)} OFFSET ${mysql.escape(currentPage * itemsPerPage)}
      `;
    
      createConnection(true)
        .then(function (connection) {
    
          connection.query(query, [],
            function (error, results) {
              if (error) {
                connection.destroy();
                callback(null, new ApiResponse(500, JSON.stringify(error)));
              } else {
                const response = mapMovieResponse(results, currentPage, itemsPerPage);      
                connection.end(function (err) {
                  callback(null, new ApiResponse(200, JSON.stringify(response)));
                });
              }
          });

      })
      .catch(function(error){
        callback(null, new ApiResponse(500, JSON.stringify(error)));
      });
    }
  });
  
};