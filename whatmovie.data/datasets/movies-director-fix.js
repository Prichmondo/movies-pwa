const csv = require('csvtojson');
const path = require('path');
const tmdbApi = require('./tmdb-api');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputputPath = path.resolve(__dirname + '/project-datasets/directors.csv');
const outputPath = path.resolve(__dirname + '/project-datasets/directors-final.csv');

function fixMoviesCSV() {

  console.log('Reading movies data from: ' + inputputPath);
  csv()
    .fromFile(inputputPath)
    .then((movies)=>{  
      updateMoviesCSV(movies);  
    });
  
}

function writeDirectorsCSV(data) {

  const csvWriter = createCsvWriter({
    path: outputPath,
    header: [
      {id: 'movie_id', title: 'movie_id'},
      {id: 'director',   title: 'director'}
    ]
  });

  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));
}

async function updateMoviesCSV(movies) {
  
  console.log('Exporting movies.csv in: ' + outputPath);
  console.log('Movies found: ' + movies.length);
  const data = [];

  for (let i = 0; i < movies.length; i++) {
    
    const movie = movies[i];
    const prefix = '[' + i + '/' + movies.length + '] - ID: ' + movie.movie_id;

    try {
      const credits = await tmdbApi.getMovieCredits(movie.movie_id);
      const director = credits && credits.crew ? credits.crew.find(c => c.job === 'Director') : '';
      movie.director = director.name;
    } catch (error) {
      console.log(prefix, error.message);
    }
    
    data.push(movie);

  }

  writeDirectorsCSV(data);

}

fixMoviesCSV();