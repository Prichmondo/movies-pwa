const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const createConnection = require('./database/createConnection');
const mysql = require('mysql2');
const mapMovieResponse = require('./mapMovieResponse');
const movies = require('./database/movies');

module.exports = (event, context, callback) => {

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