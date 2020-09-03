const csv = require('csvtojson');
const path = require('path');
const tmdbApi = require('./tmdb-api');
const constants = require('./constants');
const writeCsv = require('./write-csv');

const moviesPath = path.resolve(__dirname + constants.MOVIELENS_MOVIES_PATH);
const linksPath = path.resolve(__dirname + constants.MOVIELENS_LINKS_PATH);
const outputPath = path.resolve(__dirname + constants.DATASET_MOVIES_PATH);

function createMoviesCSV() {
 
  console.log('Reading movies data from: ' + moviesPath);
  csv()
    .fromFile(moviesPath)
    .then((movies)=>{
  
      console.log('Reading links data from: ' + moviesPath);
      csv()
        .fromFile(linksPath)
        .then((links)=>{
  
          createNewMoviesCSV(movies, links);
  
        });    
  
  });
}

async function createNewMoviesCSV(movies, links) {
  
  console.log('Exporting movies.csv in: ' + outputPath);
  const data = [];

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const link = links.find(l => l.movieId === movie.ITEM_ID);
    if(link) {
      console.log('[' + i + '/' + movies.length + '] Getting details for: ' + movie.TITLE);
      try {
        const details = await tmdbApi.getMovieDetails(link.tmdbId);
        const credits = await tmdbApi.getMovieCredits(link.tmdbId);
        const director = credits ? credits.crew.find(c => c.job === 'Director') : '';
        let title = movie.TITLE;
        const titleParts = title.split(' (');

        if(titleParts.length > 1) {
          title = titleParts[0];
        }
        
        data.push({
          ...movie,
          TITLE: title,
          TMDB_ID: link.tmdbId,
          IMDB_ID: link.imdbId,
          YEAR: details ? details.release_date.split('-')[0] : '',
          POSTER_PATH: details !== null ? details.poster_path : '',
          DIRECTOR: director ? director.name : '',
          CAST: credits ? credits.cast.map(c => c.name).join('|') : '',
          VOTE_AVERAGE: details ? details.vote_average : 0
        });
      } catch (error) {
        console.log(error.message);
      }
      
    } else {
      data.push(movie);
    }
  }

  writeCsv.writeMovieCSV(data);

}

createMoviesCSV();