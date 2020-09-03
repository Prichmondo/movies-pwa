const csv = require('csvtojson');
const path = require('path');
const tmdbApi = require('./tmdb-api');
const constants = require('./constants');
const writeCsv = require('./write-csv');

const outputPath = path.resolve(__dirname + constants.DATASET_MOVIES_PATH);

function fixMoviesCSV() {

  console.log('Reading movies data from: ' + outputPath);
  csv()
    .fromFile(outputPath)
    .then((movies)=>{  
      updateMoviesCSV(movies);  
    });
  
}

async function updateMoviesCSV(movies) {
  
  console.log('Exporting movies.csv in: ' + outputPath);
  console.log('Movies found: ' + movies.length);
  const data = [];
  let udpate = false;

  console.log('MISSING PATH', movies.filter(m => m.POSTER_PATH === '').length);

  for (let i = 0; i < movies.length; i++) {
    
    const movie = movies[i];
    const prefix = '[' + i + '/' + movies.length + '] - ID: ' + movie.TMDB_ID;
    const detailsMissing = movie.POSTER_PATH === '' || movie.YEAR === '';
    const creditsMissing = movie.DIRECTOR === '' || movie.CAST === '';

    if(detailsMissing || creditsMissing) {
      console.log(prefix, movie.TITLE, 'deatils:', detailsMissing, 'credits:', creditsMissing);
    }

    if(detailsMissing) {
      try {
        const details = await tmdbApi.getMovieDetails(movie.TMDB_ID);
        movie.YEAR = details ? details.release_date.split('-')[0] : '';
        movie.POSTER_PATH = details !== null ? details.poster_path : '';
        movie.VOTE_AVERAGE = details ? details.vote_average : 0;
        udpate = true;  
      } catch (error) {
        console.log(prefix, error.message);
      }
    }

    if(creditsMissing) {
      try {
        const credits = await tmdbApi.getMovieCredits(movie.TMDB_ID);
        const director = credits && credits.crew ? credits.crew.find(c => c.job === 'Director') : '';
        movie.DIRECTOR = director;
        movie.CAST = credits && credits.cast ? credits.cast.map(c => c.name).join('|') : '';
        udpate = true;

      } catch (error) {
        console.log(prefix, error.message);
      }
    }
    
    data.push(movie);

  }

  if(udpate) {
    writeCsv.writeMovieCSV(data);
  }

}

fixMoviesCSV();