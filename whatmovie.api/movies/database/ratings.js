const utils = require('../utils');
const createConnection = require('../database/createConnection');

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
          VALUES (:userId, :movieId, :rating)
          ON DUPLICATE KEY UPDATE rating=VALUES(rating);
          
          SET @avgRating = 0;
          SET @ratingCount = 0;
          SET @score = 0;
          
          SELECT 
            AVG(r.rating) avgRating,
            COUNT(r.rating) ratingCount,
            (COUNT(r.rating) / (COUNT(r.rating) + 30) * AVG(r.rating)) + (30 / (30 + COUNT(r.rating)) * 3.6) score
            INTO @avgRating, @ratingCount, @score
          FROM ratings r
          WHERE r.movie_id = :movieId;
          
          UPDATE movies 
          SET 
            avgRating = @avgRating,
            ratingCount = @ratingCount,
            score = @score
          WHERE id = :movieId;
        `;
        const params = { 
          userId: userId, 
          movieId: movieId, 
          rating: rating 
        }
        connection.query(query, params,
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