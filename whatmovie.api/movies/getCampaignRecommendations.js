const AWS = require('aws-sdk');
const createConnection = require('./database/createConnection');
const mysql = require('mysql2');
const mapMovieResponse = require('./mapMovieResponse');

module.exports = (userId, currentPage, itemsPerPage) => {

  return new Promise((success, reject) => {

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
                  reject(error);
                } else {
                  const response = mapMovieResponse(results, currentPage, itemsPerPage);      
                  connection.end(function (err) {
                    success(response);
                  });
                }
            });

        })
        .catch(function(error){
          reject(error);
        });
      }
    });

  }); 

};