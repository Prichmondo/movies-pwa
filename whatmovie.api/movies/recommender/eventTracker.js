const datasets = require('../database/datasets');
const correlationScores = require('../database/correlationScores');
const personCorrelation = require('./personCorrelation');

module.exports.trackUserRating = async function(userId, movieId, rating) {
  
  return new Promise((resolve, reject) => {

    // Getting the Ratings from users who rated the same movie
    datasets.getInteractionDatasetByMovie(userId, movieId, rating)
      .then(interactionDataset => {
        
        // Comparing others' ratings with the user's ratings to rank similar users
        const userScores = personCorrelation.rankSimilarUsers(interactionDataset, userId);
        
        if(userScores.length > 0) {

          // Update users correlation score in the database
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