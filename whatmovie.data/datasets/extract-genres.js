const csv = require('csvtojson');
const path = require('path');
const tmdbApi = require('./tmdb-api');
const constants = require('./constants');
const writeCsv = require('./write-csv');

const moviesPath = path.resolve(__dirname + constants.MOVIELENS_MOVIES_PATH);

function readMoviesCSV() {
 
  console.log('Reading movies data from: ' + moviesPath);
  csv()
    .fromFile(moviesPath)
    .then((movies)=>{
  
      const genres = {};
      console.log(movies);
      movies.forEach(movie => {
        if(movie.GENERES) {
          const gs = movie.GENERES.split('|');
          gs.forEach(g => genres[g] = true);
        }
      });

      console.log(genres);
  
    });
}

readMoviesCSV();