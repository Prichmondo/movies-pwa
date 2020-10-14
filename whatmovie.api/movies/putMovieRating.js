const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const Exception = require('./domain/exception');
const ratings = require('./database/ratings');

module.exports = (event, context, callback) => {

  try {

    if(!utils.hasValue(event.body)) {
      throw new Exception("Request body is empty");
    }
    
    const body = JSON.parse(event.body);    
    const movieId = body.movieId;
    const rating = body.rating;
    const genres = body.genres;
    const userId = utils.getUserId(event);
    
    if(!utils.hasValue(movieId)) {
      throw new Exception("Movie ID is empty");
    }
    
    if(!utils.hasValue(rating)) {
      throw new Exception("Rating is empty");
    }
    
    if(!utils.hasValue(userId)) {
      throw new Exception("User not authorizer");
    }
    
    ratings.PutMovieRating(userId, movieId, rating, genres)
      .then(data => callback(null, new ApiResponse(200, JSON.stringify(data))))
      .catch(error => callback(null, new ApiResponse(500, JSON.stringify(error)))); 
    
  } catch (error) {
    callback(null,
      new ApiResponse(500, JSON.stringify(error))
    );
  }

};