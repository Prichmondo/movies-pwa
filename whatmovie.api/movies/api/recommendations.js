const utils = require('../utils');
const ApiResponse = require('../domain/apiResponse');
const recommendations = require('../database/recommendations');


module.exports.get = (event, context, callback) => {

  let itemsPerPage = utils.getQuerystringParam(event, 'itemsPerPage', 20);
  let currentPage = utils.getQuerystringParam(event, 'currentPage', 0);
  let userId = utils.getUserId(event);
  
  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }

  recommendations.getFromSimilarUsers(userId, currentPage, itemsPerPage)
    .then(response => callback(null, new ApiResponse(200, JSON.stringify(response))))
    .catch(error => callback(null, new ApiResponse(500, JSON.stringify(error))));
};