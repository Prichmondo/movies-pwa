const dbClient = require('./dbClient');
const mapMovieResponse = require('../domain/mapMovieResponse');

module.exports.getAll = async function(userId, currentPage, itemsPerPage){

  return new Promise((resolve, reject) => {

    const query = `
      SELECT COUNT(*) as total 
      FROM movies AS mo 
      LEFT JOIN wishlist AS wl 
        ON wl.user_id = :userId 
        AND wl.movie_id = mo.id
      WHERE mo.id = wl.movie_id;
      SELECT
        mo.*
        ,ura.rating as userRating
        ,AVG(ra.rating) as avgRating
        ,CASE 
          WHEN wl.movie_id IS NULL THEN false
          ELSE true
          END AS watchlist
      FROM movies AS mo
      JOIN ratings AS ra ON ra.movie_id = mo.id
      LEFT JOIN ratings AS ura ON ura.user_id = :userId AND ura.movie_id = mo.id
      LEFT JOIN wishlist AS wl ON wl.user_id = :userId AND wl.movie_id = mo.id
      WHERE mo.id = wl.movie_id 
      GROUP BY mo.id
      ORDER BY mo.vote DESC
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

module.exports.remove = async function(userId, movieId){

  return new Promise((resolve, reject) => {

    const query = `
      DELETE FROM wishlist 
      WHERE user_id = :userId 
        AND movie_id = :movieId
    `;

    const params = {
      userId: userId,
      movieId: movieId
    }

    dbClient.query(query, params, true)
      .then(resolve)
      .catch(reject);

  });

};

module.exports.add = async function(userId, movieId){

  return new Promise((resolve, reject) => {

    const query = `
      INSERT INTO wishlist
        (user_id, movie_id)
      VALUES 
        (:userId, :movieId)
    `;

    const params = {
      userId: userId,
      movieId: movieId
    }

    dbClient.query(query, params, true)
      .then(resolve)
      .catch(reject);

  });
  
};