const utils = require('../utils');
const ApiResponse = require('../domain/apiResponse');
const Exception = require('../domain/exception');
const myList = require('../database/mylist');

module.exports.get = (event, context, callback) => {

  let itemsPerPage = utils.getQuerystringParam(event, 'itemsPerPage', 20);
  let currentPage = utils.getQuerystringParam(event, 'currentPage', 0);
  let userId = utils.getUserId(event);

  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }

  myList.getAll(userId, currentPage, itemsPerPage)
    .then(response => callback(null, new ApiResponse(200, JSON.stringify(response))))
    .catch(error => callback(null, new ApiResponse(500, JSON.stringify(error))));
};

module.exports.delete = (event, context, callback) => {

  try {

    if(!utils.hasValue(event.body)) {
      throw new Exception("Request body is empty");
    }
    
    const body = JSON.parse(event.body);    
    const movieId = body.movieId;
    const userId = utils.getUserId(event);
    
    if(!utils.hasValue(movieId)) {
      throw new Exception("Movie ID is empty");
    }
    
    if(!utils.hasValue(userId)) {
      throw new Exception("User not authorizer");
    }

    myList.remove(userId, movieId)
      .then(response => callback(null, new ApiResponse(200, JSON.stringify(response))))
      .catch(error => callback(null, new ApiResponse(500, JSON.stringify(error))));
    
  } catch (error) {
    callback(null,
      new ApiResponse(500, JSON.stringify(error))
    );
  }

};

module.exports.put = (event, context, callback) => {

  try {

    if(!utils.hasValue(event.body)) {
      throw new Exception("Request body is empty");
    }
    
    const body = JSON.parse(event.body);    
    const movieId = body.movieId;
    const userId = utils.getUserId(event);
    
    if(!utils.hasValue(movieId)) {
      throw new Exception("Movie ID is empty");
    }
    
    if(!utils.hasValue(userId)) {
      throw new Exception("User not authorizer");
    }

    myList.add(userId, movieId)
      .then(response => callback(null, new ApiResponse(200, JSON.stringify(response))))
      .catch(error => callback(null, new ApiResponse(500, JSON.stringify(error))));
      
  } catch (error) {
    callback(null,
      new ApiResponse(500, JSON.stringify(error))
    );
  }

};