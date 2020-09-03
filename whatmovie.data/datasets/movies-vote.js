const csv = require('csvtojson');
const path = require('path');
const constants = require('./constants');
const writeCsv = require('./write-csv');
const tmdbApi = require('./tmdb-api');

console.log(writeCsv);

const outputPath = path.resolve(__dirname + constants.DATASET_MOVIES_PATH);

async function updateMoviesCSV(movies) {
  
  console.log('Exporting movies.csv in: ' + outputPath);
  console.log('Movies found: ' + movies.length);
  const data = [];
  let udpate = false;

  console.log('VOTE PATH', movies.filter(m => m.POSTER_PATH === '').length);

  for (let i = 0; i < movies.length; i++) {
    
    const movie = movies[i];
    const prefix = '[' + i + '/' + movies.length + '] - ID: ' + movie.TMDB_ID;
    console.log(prefix, movie.TITLE, 'UPDATING VOTE');

    try {
      const details = await tmdbApi.getMovieDetails(movie.TMDB_ID);
      movie.VOTE_AVERAGE = details ? details.vote_average : 0;
      udpate = true;  
    } catch (error) {
      console.log(prefix, error.message);
    }

    data.push(movie);

  }

  if(udpate) {
    writeCsv.writeMovieCSV(data);
  }

}

function updateMoviesAverageVote() {

  console.log('Reading movies data from: ' + outputPath);
  csv()
    .fromFile(outputPath)
    .then((movies)=>{  
      updateMoviesCSV(movies);  
    });
  
}

updateMoviesAverageVote();