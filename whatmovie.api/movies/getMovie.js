const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const movies = require('./database/movies');

module.exports = (event, context, callback) => {

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