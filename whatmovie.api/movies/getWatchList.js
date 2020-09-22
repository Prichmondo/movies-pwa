const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const createConnection = require('./database/createConnection');
const mysql = require('mysql2');

module.exports = (event, context, callback) => {

  let itemsPerPage = utils.getQuerystringParam(event, 'itemsPerPage', 20);
  let currentPage = utils.getQuerystringParam(event, 'currentPage', 0);
  let userId = utils.getUserId(event);

  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }
  
  const query = `
    SELECT COUNT(*) as total FROM movies AS mo 
    LEFT JOIN wishlist AS wl ON wl.user_id = ${mysql.escape(userId)} AND wl.movie_id = mo.id
    WHERE mo.id = wl.movie_id;
    SELECT mo.id, mo.title, mo.genres, mo.tmdbid, mo.imdbid, mo.year, mo.img, mo.director, mo.cast, mo.vote, ura.rating as userRating, AVG(ra.rating) as avgRating,
    CASE 
      WHEN wl.movie_id IS NULL THEN false
      ELSE true
    END AS watchlist
    FROM movies AS mo
    JOIN ratings AS ra ON ra.movie_id = mo.id
    LEFT JOIN ratings AS ura ON ura.user_id = ${mysql.escape(userId)} AND ura.movie_id = mo.id
    LEFT JOIN wishlist AS wl ON wl.user_id = ${mysql.escape(userId)} AND wl.movie_id = mo.id
    WHERE mo.id = wl.movie_id 
    GROUP BY mo.id
    ORDER BY mo.vote DESC
    LIMIT ? OFFSET ?
  `;
  
  const queryParams = [itemsPerPage, currentPage * itemsPerPage];

  createConnection(true)
    .then(function (connection) {

      connection.query(query, queryParams,
        function (error, results) {
          if (error) {
            connection.destroy();
            callback(null, new ApiResponse(500, JSON.stringify(error)));
          } else {
            
            const countResult = results[0];
            const itemsResult = results[1];
            const totalItems = countResult[0].total;
            const totalPages= Math.ceil(totalItems/itemsPerPage);
            const response = {
              totalItems: totalItems,
              totalPages: totalPages,
              itemsPerPage: itemsPerPage,
              currentPage: parseInt(currentPage),
              pages: itemsResult.map(movie => {
                movie.watchList = movie.watchList === 1;
                return movie;
              })
            }

            connection.end(function (err) {
              callback(null, new ApiResponse(200, JSON.stringify(response)));
            });
          }
      });

    })
    .catch(function(error){
      callback(null, new ApiResponse(500, JSON.stringify(error)));
    });

};