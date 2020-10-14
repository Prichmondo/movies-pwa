const utils = require('../utils');
const createConnection = require('../database/createConnection');
const putEvents = require('../putEvents');

module.exports.PutMovieRating = async function(userId, movieId, rating, genres) {
  return new Promise((resolve, reject) => {

    if(!utils.hasValue(movieId)) {
      reject({ message: "Movie ID is empty" });
    }
    
    if(!utils.hasValue(rating)) {
      reject({ message: "Rating is empty" });
    }
    
    if(!utils.hasValue(userId)) {
      reject({ message: "User not authorizer" });
    }

    createConnection()
      .then(function (connection) {

        const query = `
          INSERT INTO ratings (user_id, movie_id, rating) 
          VALUES (?,?,?)
          ON DUPLICATE KEY UPDATE rating=VALUES(rating);
        `;
        connection.query(query, [userId, movieId, rating],
          function (error, results) {
            if (error) {
              connection.destroy();
              reject(error);
            } else {                    
              connection.end(function (err) {
                if(err) {
                  reject(err);
                } else {

                  resolve({ userId: userId, movieId: movieId, rating: rating })

                  // putEvents(userId, movieId, rating, genres, '6a38e634-d16b-4577-92c7-a414b4d2dc1e')
                  //   .then(data => resolve(data))
                  //   .catch(error => reject(error));               
                }
              });
            }
      });
      
    })
    .catch(function (error){
      reject(error);
    });
  });
};