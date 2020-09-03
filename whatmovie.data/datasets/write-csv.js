const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const outputPath = path.resolve(__dirname + '/project-datasets/movies.csv');

function writeMovieCSV(data) {

  const csvWriter = createCsvWriter({
    path: outputPath,
    header: [
      {id: 'ITEM_ID', title: 'ITEM_ID'},
      {id: 'TITLE',   title: 'TITLE'},
      {id: 'GENERES', title: 'GENERES'},
      {id: 'TMDB_ID', title: 'TMDB_ID'},
      {id: 'IMDB_ID', title: 'IMDB_ID'},
      {id: 'YEAR', title: 'YEAR'},
      {id: 'POSTER_PATH', title: 'POSTER_PATH'},
      {id: 'DIRECTOR', title: 'DIRECTOR'},
      {id: 'CAST', title: 'CAST'},
      {id: 'VOTE_AVERAGE', title: 'VOTE_AVERAGE'}
    ]
  });

  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));
}

module.exports = {
  writeMovieCSV: writeMovieCSV
}