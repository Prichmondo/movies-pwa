const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const createConnection = require('./database/createConnection');
const mysql = require('mysql2');
const mapMovieResponse = require('./mapMovieResponse');

module.exports = (event, context, callback) => {

  const genre = utils.getQuerystringParam(event, 'genre', '');
  const searchTerm = utils.getQuerystringParam(event, 'searchTerm', '');
  let itemsPerPage = utils.getQuerystringParam(event, 'itemsPerPage', 20);
  let currentPage = utils.getQuerystringParam(event, 'currentPage', 0);
  let userId = utils.getUserId(event);

  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }
  
  const conditions = [];
  
  if(utils.hasValue(genre)) {
    conditions.push('LOWER(REPLACE(genres, " ", "")) LIKE LOWER(REPLACE(' + mysql.escape('%' + genre + '%') + ', " ", ""))');
  }
  
  if(utils.hasValue(searchTerm)) {
    conditions.push('LOWER(REPLACE(CONCAT(genres,title,cast,director), " ", "")) LIKE LOWER(REPLACE(' + mysql.escape('%' + searchTerm + '%') + ', " ", ""))');
  }
  
  let where = '';
  if(conditions.length > 0) {
    where = 'WHERE ' + conditions.join(' AND ');
  }
  
  const query = `
    SELECT COUNT(*) as total FROM movies ${where};
    SELECT mo.id, mo.title, mo.genres, mo.tmdbid, mo.imdbid, mo.year, mo.img, mo.director, mo.cast, mo.vote, ura.rating as userRating, AVG(ra.rating) as avgRating,
    CASE 
      WHEN wl.movie_id IS NULL THEN false
      ELSE true
    END AS watchlist
    FROM movies AS mo
    JOIN ratings AS ra ON ra.movie_id = mo.id
    LEFT JOIN ratings AS ura ON ura.user_id = :userId AND ura.movie_id = mo.id
    LEFT JOIN wishlist AS wl ON wl.user_id = :userId AND wl.movie_id = mo.id
    ${where}
    GROUP BY mo.id
    ORDER BY mo.title
    LIMIT :limit
    OFFSET :offset
  `;
  
  const parmas = {
    userId: userId,
    limit: itemsPerPage,
    offset: currentPage * itemsPerPage
  }

  createConnection(true)
    .then(function (connection) {
      connection.query(query, parmas,
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

};