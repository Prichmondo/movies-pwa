const mapMovieResponse = require('../mapMovieResponse');
const dbClient = require('./dbClient');

module.exports.getPopularMovies = async function(userId, currentPage, itemsPerPage){

  return new Promise((resolve, reject) => {

    const query = `   
      SELECT COUNT(*) as total FROM movies;
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

module.exports.getRatedMovies = async function(userId, currentPage, itemsPerPage){

  return new Promise((resolve, reject) => {

    const query = `   
      SELECT COUNT(*) as total FROM ratings WHERE user_id = :userId;
      SELECT 
        m.*
        ,ur.rating as userRating
        ,AVG(r.rating) as avgRating
        ,CASE 
          WHEN wl.movie_id IS NULL THEN false
          ELSE true
          END AS watchlist
      FROM ratings AS ur
      JOIN ratings AS r 
        ON r.movie_id = ur.movie_id
      LEFT JOIN wishlist AS wl 
        ON wl.user_id = :userId
        AND wl.movie_id = ur.movie_id
      LEFT JOIN movies AS m 
        ON m.id = ur.movie_id
      WHERE ur.user_id = :userId
      GROUP BY m.id
      ORDER BY userRating DESC
      LIMIT :limit OFFSET :offset
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
      filters.push(`m.genre LIKE ':genre'`);
    }

    const where = filters.length > 0
      ? `WHERE ${filters.join(' AND ')}`
      : '';

    const query = `   
      SELECT COUNT(*) as total FROM movies m ${where};
      SELECT 
        m.*
        ,ur.rating as userRating
        ,AVG(r.rating) as avgRating
        ,CASE 
          WHEN wl.movie_id IS NULL THEN false
          ELSE true
          END AS watchlist
      FROM movies AS m
      JOIN ratings AS r 
        ON r.movie_id = m.id
      LEFT JOIN ratings AS ur 
        ON ur.user_id = :userId
          AND ur.movie_id = m.id
      LEFT JOIN wishlist AS wl 
        ON wl.user_id = :userId
          AND wl.movie_id = m.id
      ${where}
      GROUP BY m.id
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
      SELECT mo.*, AVG(ra.rating) as avgRating, ura.rating as userRating,
      CASE 
        WHEN wl.movie_id IS NULL THEN false
        ELSE true
      END AS watchlist
      FROM movies AS mo
      JOIN ratings AS ra ON ra.movie_id = mo.id
      LEFT JOIN ratings AS ura ON ura.user_id = :userId AND ura.movie_id = mo.id
      LEFT JOIN wishlist AS wl ON wl.user_id = :userId AND wl.movie_id = mo.id
      WHERE mo.id = :movieId
      GROUP BY mo.id
      ORDER BY mo.title
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