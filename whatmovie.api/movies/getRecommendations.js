const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const getCampaignRecommendations = require('./getCampaignRecommendations');
const getPopularMovies = require('./getPopularMovies');

module.exports = (event, context, callback) => {

  let itemsPerPage = utils.getQuerystringParam(event, 'itemsPerPage');
  let currentPage = utils.getQuerystringParam(event, 'currentPage');
  let userId = utils.getUserId(event);

  if(!userId) {
    callback(null, new ApiResponse(401, "User not authorized"));
  }
  
  if(!utils.hasValue(currentPage)) {
    currentPage = 0;
  }
  
  if(typeof currentPage === 'string') {
    currentPage = parseInt(currentPage);
  }
  
  if(!utils.hasValue(itemsPerPage)) {
    itemsPerPage = 20;
  }
  
   if(typeof itemsPerPage === 'string') {
    itemsPerPage = parseInt(itemsPerPage);
  }

  // Getting recommendations from the campaign
  getCampaignRecommendations(userId, currentPage, itemsPerPage)
    .then(response => {
      callback(null, new ApiResponse(200, JSON.stringify(response)));
    })
    .catch(error => {
      // in case of any error response from personalize
      // returns a list of popular movies
      getPopularMovies(userId, currentPage, itemsPerPage)
      .then(response => {
        callback(null, new ApiResponse(200, JSON.stringify(response)));
      })
      .catch(error => {
        callback(null, new ApiResponse(500, JSON.stringify(error)));
      });

    }); 

};