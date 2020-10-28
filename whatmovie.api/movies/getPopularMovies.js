const utils = require('./utils');
const movies = require('./database/movies');
const ApiResponse = require('./domain/apiResponse');

module.exports = (event, context, callback) => {

  let userId = utils.getUserId(event);
  let currentPage = utils.getQuerystringParam(event, 'currentPage', 0);
  let itemsPerPage = utils.getQuerystringParam(event, 'itemsPerPage', 20);
  let genre = utils.getQuerystringParam(event, 'genre', '');
  
  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }

  movies.getPopularMovies(userId, currentPage, itemsPerPage, genre)
    .then(response => callback(null, new ApiResponse(200, JSON.stringify(response))))
    .catch(error => callback(null, new ApiResponse(500, JSON.stringify(error))));

};