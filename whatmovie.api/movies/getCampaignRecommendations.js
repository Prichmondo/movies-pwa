const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const AWS = require('aws-sdk');
const createConnection = require('./database/createConnection');
const mysql = require('mysql2');

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

        const where = `WHERE id IN (${data.itemList.map(r => r.itemId).join(',')})`;

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
          GROUP BY mo.id
        `;
      
        createConnection(true)
          .then(function (connection) {
      
            connection.query(query, [],
              function (error, results) {
                if (error) {
                  connection.destroy();
                  reject(error);
                } else {
                  const countResult = results[0];
                  const itemsResult = results[1];
                  const totalItems = countResult[0].total;
                  const totalPages= Math.ceil(totalItems/itemsPerPage);
                  const items = itemsResult.map(movie => {
                    const scroeItem = data.itemList.find(d => d.itemId === `${movie.id}`);
                    movie.watchList = movie.watchList === 1;
                    movie.score = utils.hasValue(scroeItem) ? scroeItem.score : 0
                    return movie;
                  });
                  items.sort((a,b)=>{
                    if(a.score > b.score) {
                      return -1;
                    } else if(a.score < b.score) {
                      return 1;
                    }
                    return 0;
                  });
                  
                  const response = {
                    totalItems: totalItems,
                    totalPages: totalPages,
                    itemsPerPage: itemsPerPage,
                    currentPage: currentPage,
                    pages: items
                  };
      
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