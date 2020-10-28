const createConnection = require('../database/createConnection');
const mysql = require('mysql2');
const mapMovieResponse = require('../mapMovieResponse');
const AWS = require('aws-sdk');

module.exports.getFromSimilarUsers = async function(userId, currentPage, itemsPerPage){

  return new Promise((resolve, reject) => {

    createConnection(true)
      .then(function (connection) {

        const query = `
          SELECT 100;
          SELECT 
            m.*
              ,rr.*
              ,ur.rating userRating
              ,CASE
                WHEN wl.movie_id IS NULL THEN false
                ELSE true
                END AS watchlist
          FROM (
            SELECT 
              r.movie_id
              ,AVG(r.rating) avgRating
              ,SUM(r.rating * ucs.score) sumSimScore
              ,SUM(ucs.score) sumSim
              ,(SUM(r.rating * ucs.score) / SUM(ucs.score)) total
              ,COUNT(r.rating) ratingCount
            FROM (
              SELECT * 
              FROM usersCorrelationScores 
              WHERE user_id = :userId
              ORDER BY score DESC
              LIMIT 100
            ) ucs
            LEFT JOIN ratings r 
              ON r.user_id = ucs.other_user_id
              AND r.movie_id NOT IN (
                SELECT movie_id 
                FROM ratings 
                WHERE user_id = :userId
              )
            GROUP BY r.movie_id
            HAVING COUNT(r.rating) > 10
          ) rr
          LEFT JOIN movies m 
            ON rr.movie_id = m.id
          LEFT JOIN ratings ur 
            ON ur.user_id = :userId
            AND ur.movie_id = rr.movie_id
          LEFT JOIN wishlist AS wl 
            ON wl.user_id = @user_id
            AND wl.movie_id = rr.movie_id
          WHERE rr.ratingCount > 10
          ORDER BY rr.total DESC
          LIMIT :limit 
          OFFSET :offset
        `;

        const params = {
          userId: userId,
          limit: itemsPerPage,
          offset: currentPage * itemsPerPage
        } 

        connection.query(query, params,
          function (error, results) {
            if (error) {
              connection.destroy();
              reject(error);
            } else {
              const response = mapMovieResponse(results, currentPage, itemsPerPage);      
              connection.end(function (error) {
                if(error) {
                  reject(error);
                } else {
                  resolve(response);
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

module.exports.getFromPersonalize = (userId, currentPage, itemsPerPage) => {

  return new Promise((resolve, reject) => {

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

        const itemsList = data.itemList.map(r => mysql.escape(itemId)).join(',');
        const query = `
          SELECT COUNT(*) as total FROM movies AS mo WHERE id IN (${itemsList});
          SELECT mo.*, ura.rating as userRating, AVG(ra.rating) as avgRating,
          CASE 
            WHEN wl.movie_id IS NULL THEN false
            ELSE true
          END AS watchlist
          FROM movies AS mo
          JOIN ratings AS ra ON ra.movie_id = mo.id
          LEFT JOIN ratings AS ura ON ura.user_id = :userId} AND ura.movie_id = mo.id
          LEFT JOIN wishlist AS wl ON wl.user_id = :userId} AND wl.movie_id = mo.id
          WHERE id IN (${itemsList})
          GROUP BY FIELD(mo.id, ${itemsList})
          LIMIT :limit
          OFFSET :offset
        `;

        const params = {
          userId: userId,
          limit: itemsPerPage,
          offset: currentPage * itemsPerPage
        }
      
        createConnection(true)
          .then(function (connection) {
      
            connection.query(query, params,
              function (error, results) {
                if (error) {
                  connection.destroy();
                  reject(error);
                } else {
                  const response = mapMovieResponse(results, currentPage, itemsPerPage);      
                  connection.end(function (error) {
                    if(error) {
                      reject(error);
                    } else {
                      resolve(response);
                    } 
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