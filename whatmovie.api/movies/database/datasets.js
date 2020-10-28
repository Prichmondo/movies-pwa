const createConnection = require('./createConnection');
const mysql = require('mysql2');

module.exports.getInteractionDatasetByMovie = async function(userId, movieId, rating) {
  
  return new Promise((resolve, reject) => {

    const query = `
      SELECT user_id, movie_id, rating FROM ratings AS cr WHERE cr.user_id = :userId;
      SELECT r.user_id, ur.movie_id, ur.rating FROM ratings AS r
      LEFT JOIN ratings AS ur ON ur.user_id = r.user_id
      WHERE r.movie_id = :movieId
      AND ur.movie_id IN (SELECT movie_id FROM ratings AS cr WHERE cr.user_id = :userId)
      ORDER BY r.user_id
    `;
    
    const params = {
      userId: userId,
      movieId: movieId,
      rating: rating
    } 

    createConnection(true)
      .then(function (connection) {
        connection.query(query, params,
          function (error, results) {
            if (error) {
              connection.destroy();
              reject(error);
            } else {
              
              connection.end(function (error) {
                if(error) {
                  reject(error);
                } else {
                  
                  const userMovies = results[0];
                  const othersMovies = results[1];
                  const response = {};
                  
                  // mapping user's movie ratings
                  response[userId] = {};
                  userMovies.forEach(m => {
                    response[userId][m.movie_id] = m.rating;
                  });
                  
                  // mapping others' movie ratings
                  othersMovies.forEach(m => {
                    if(typeof response[m.user_id] === 'undefined') {
                      response[m.user_id] = {};
                    }
                    response[m.user_id][m.movie_id] = m.rating;
                  });

                  resolve(response);

                }
              });
            }
        });
      })
      .catch(function(error){
        reject(error);
      });

    })

  
}