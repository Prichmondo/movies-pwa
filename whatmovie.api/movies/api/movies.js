const utils = require('../utils');
const ApiResponse = require('../domain/apiResponse');
const movies = require('../database/movies');

module.exports.get = (event, context, callback) => {

  const genre = utils.getQuerystringParam(event, 'genre', '');
  const searchTerm = utils.getQuerystringParam(event, 'searchTerm', '');
  let itemsPerPage = utils.getQuerystringParam(event, 'itemsPerPage', 20);
  let currentPage = utils.getQuerystringParam(event, 'currentPage', 0);
  let userId = utils.getUserId(event);

  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }
  
  movies.searchMovies(userId, currentPage, itemsPerPage, searchTerm, genre)
    .then(response => callback(null, new ApiResponse(200, JSON.stringify(response))))
    .catch(error => callback(null, new ApiResponse(500, JSON.stringify(error))))
};

module.exports.getById = (event, context, callback) => {

  let movieId = utils.getQuerystringParam(event, 'movieId', 0);
  let userId = utils.getUserId(event);

  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }

  if(!movieId) {
    callback(null, new ApiResponse(401, "Unknown movie"));
  }

  movies.getMovie(userId, movieId)
    .then(response => callback(null, new ApiResponse(200, JSON.stringify(response))))
    .catch(error => callback(null, new ApiResponse(500, JSON.stringify(error))));

};