const mysql = require('mysql2');
const mapMovieResponse = require('../mapMovieResponse');
const dbClient = require('./dbClient');

module.exports.getPopularMovies = async function(userId, currentPage, itemsPerPage){

  return new Promise((resolve, reject) => {

    const query = `   
      SELECT COUNT(*) as total FROM movies AS mo;
      SELECT 
        m.*
        ,ur.rating as userRating
        ,AVG(r.rating) as avgRating
        ,CASE 
          WHEN wl.movie_id IS NULL THEN false
          ELSE true
          END AS watchlist
          ,(COUNT(r.rating) / (COUNT(r.rating) + 30) * AVG(r.rating)) + (30 / (30 + COUNT(r.rating)) * 3.6) score
      FROM movies AS m
      JOIN ratings AS r 
        ON r.movie_id = m.id
      LEFT JOIN ratings AS ur 
        ON ur.user_id = :userId
          AND ur.movie_id = m.id
      LEFT JOIN wishlist AS wl 
        ON wl.user_id = :userId
          AND wl.movie_id = m.id
      GROUP BY m.id
      ORDER BY score DESC
      LIMIT :limit
      OFFSET :offset
    `;

    const params = {
      userId: userId,
      limit: itemsPerPage,
      offset: currentPage * itemsPerPage
    }

    dbClient.query(query, params, true)
      .then(results => {
        const response = mapMovieResponse(results, currentPage, itemsPerPage);
        resolve(response);
      })
      .catch(reject);

  });  
};