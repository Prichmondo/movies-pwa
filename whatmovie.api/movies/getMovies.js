const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const createConnection = require('./database/createConnection');
const mysql = require('mysql2');

module.exports = (event, context, callback) => {

  const genre = utils.getQuerystringParam(event, 'genre');
  const searchTerm = utils.getQuerystringParam(event, 'searchTerm');
  let itemsPerPage = utils.getQuerystringParam(event, 'itemsPerPage');
  let currentPage = utils.getQuerystringParam(event, 'currentPage');
  let userId = utils.getUserId(event);

  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }
  
  if(!utils.hasValue(currentPage)) {
    currentPage = 0;
  }
  
  if(typeof currentPage === 'string') {
    currentPage = parseInt(currentPage);
  }
  
  if(!utils.hasValue(itemsPerPage)) {
    itemsPerPage = 20;
  }
  
   if(typeof itemsPerPage === 'string') {
    itemsPerPage = parseInt(itemsPerPage);
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
    LEFT JOIN ratings AS ura ON ura.user_id = ${mysql.escape(userId)} AND ura.movie_id = mo.id
    LEFT JOIN wishlist AS wl ON wl.user_id = ${mysql.escape(userId)} AND wl.movie_id = mo.id
    ${where}
    GROUP BY mo.id
    ORDER BY mo.title
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