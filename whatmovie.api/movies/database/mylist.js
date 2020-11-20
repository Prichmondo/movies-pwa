const dbClient = require('./dbClient');
const mapMovieResponse = require('../domain/mapMovieResponse');

module.exports.getAll = async function(userId, currentPage, itemsPerPage){

  return new Promise((resolve, reject) => {

    const query = `
      SELECT COUNT(*) as total FROM wishlist w WHERE w.user_id = :userId;
      SELECT
        m.*
        ,r.rating as userRating
        ,CASE 
        WHEN w.movie_id IS NULL THEN false
        ELSE true
        END AS watchlist
      FROM wishlist w
      LEFT JOIN movies m ON m.id = w.movie_id
      LEFT JOIN ratings r ON r.movie_id = w.movie_id AND r.user_id = :userId
      WHERE w.user_id = :userId
      LIMIT :limit
      OFFSET :offset;
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