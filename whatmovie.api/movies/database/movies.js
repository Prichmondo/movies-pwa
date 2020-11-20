const mapMovieResponse = require('../domain/mapMovieResponse');
const dbClient = require('./dbClient');
const mysql = require('mysql2');

const baseMovieQuery = `
  SELECT 
    m.*
    ,ur.rating as userRating
    ,CASE 
      WHEN wl.movie_id IS NULL THEN false
      ELSE true
      END AS watchlist
  FROM movies AS m
  LEFT JOIN ratings AS ur 
    ON ur.user_id = :userId
    AND ur.movie_id = m.id
  LEFT JOIN wishlist AS wl
    ON wl.user_id = :userId
    AND wl.movie_id = m.id
`;

module.exports.getPopularMovies = async function(userId, currentPage, itemsPerPage, genre){

  return new Promise((resolve, reject) => {

    const filters = []   

    if(genre) {
      filters.push(`m.genres LIKE :genre`);
    }

    const where = filters.length > 0
      ? `WHERE ${filters.join(' AND ')}`
      : '';

    const query = `   
      SELECT COUNT(*) as total FROM movies m ${where};
      ${baseMovieQuery}
      ${where}
      ORDER BY score DESC
      LIMIT :limit
      OFFSET :offset
    `;

    const params = {
      userId: userId,
      limit: itemsPerPage,
      offset: currentPage * itemsPerPage,
      genre: `%${genre}%`
    }

    dbClient.query(query, params, true)
      .then(results => {
        const response = mapMovieResponse(results, currentPage, itemsPerPage);
        resolve(response);
      })
      .catch(reject);

  });  
};

module.exports.getRatedMovies = async function(userId, currentPage, itemsPerPage){

  return new Promise((resolve, reject) => {

    const query = `   
      SELECT COUNT(*) as total FROM ratings r WHERE r.user_id = :userId;
      SELECT
      m.*
      ,r.rating as userRating
      ,CASE 
        WHEN w.movie_id IS NULL THEN false
        ELSE true
        END AS watchlist
      FROM ratings r
      LEFT JOIN movies m ON m.id = r.movie_id
      LEFT JOIN wishlist w ON r.movie_id = w.movie_id AND w.user_id = :userId
      WHERE r.user_id = :userId
      ORDER BY r.rating DESC
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

module.exports.searchMovies = async function(userId, currentPage, itemsPerPage, searchTerm, genre){

  return new Promise((resolve, reject) => {

    const filters = []

    if(searchTerm){
      filters.push(`
        MATCH(m.title, m.director, m.genres, m.cast, m.year) 
        AGAINST(:searchTerm IN NATURAL LANGUAGE MODE)
      `);
    }    

    if(genre) {
      const genres = genre.split(',');
      genres.forEach(g => {
        filters.push(`m.genres LIKE ${mysql.escape(`%${g}%`)}`);
      });      
    }

    const where = filters.length > 0
      ? `WHERE ${filters.join(' AND ')}`
      : '';

    const query = `   
      SELECT COUNT(*) as total FROM movies m ${where};
      ${baseMovieQuery}
      ${where}
      LIMIT :limit
      OFFSET :offset
    `;

    const params = {
      userId: userId,
      limit: itemsPerPage,
      offset: currentPage * itemsPerPage,
      searchTerm: searchTerm,
      genre: `%${genre}%`
    }

    dbClient.query(query, params, true)
      .then(results => {
        const response = mapMovieResponse(results, currentPage, itemsPerPage);
        resolve(response);
      })
      .catch(reject);

  });  
};

module.exports.getMovie = async function(userId, movieId){

  return new Promise((resolve, reject) => {

    const query = `
      ${baseMovieQuery}
      WHERE m.id = :movieId
    `;

  const params = {
    userId: userId,
    movieId: movieId
  }

    dbClient.query(query, params, true)
      .then(results => {
        const movie = results[0];
        resolve(movie);
      })
      .catch(reject);

  });  
};