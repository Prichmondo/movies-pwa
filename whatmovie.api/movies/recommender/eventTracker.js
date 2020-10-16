const datasets = require('../database/datasets');
const correlationScores = require('../database/correlationScores');
const personCorrelation = require('./personCorrelation');

module.exports.trackUserRating = async function(userId, movieId, rating) {
  
  return new Promise((resolve, reject) => {

    // Get Ratings from other users who rated the movie
    datasets.getInteractionDatasetByMovie(userId, movieId, rating)
      .then(interactionDataset => {
        
        // Compare others' ratings with the user's ratings to rank similar users
        const userScores = personCorrelation.rankSimilarUsers(interactionDataset, userId);
        
        if(userScores.length > 0) {

          // Update users correlation score
          correlationScores.updateUserCorrelationScores(userId, userScores)
            .then(resolve)
            .catch(reject);
            
        } else {
          resolve([]);
        }

      })
      .catch(reject);

  });  

}