const csv = require('csvtojson');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fetch = require('node-fetch');

const ratingsPath = path.resolve(__dirname + '/ml-latest-small/ratings.csv');
const moviesPath = path.resolve(__dirname + '/ml-latest-small/movies.csv');
const outputPath = path.resolve(__dirname + '/project-datasets/user-interactions.csv');

function createUserInteraction() {
 
  console.log('Reading data from: ' + ratingsPath);
  csv()
    .fromFile(ratingsPath)
    .then((interactions)=>{
      
      console.log('Reading data from: ' + moviesPath);
      csv()
        .fromFile(moviesPath)
        .then((movies)=>{
      
          writeInteractionCSV(interactions, movies);   
      
      });

  });
}

async function writeInteractionCSV(interactions, movies) {
  
  console.log('Exporting interaction.csv in: ' + outputPath);

  const data = interactions.map(interaction => {
    const movie = movies.find(m => m.ITEM_ID === interaction.ITEM_ID);
    return {
      USER_ID: interaction.USER_ID,
      ITEM_ID: interaction.ITEM_ID,
      GENERES: movie.GENERES,
      EVENT_TYPE: 'RATING',
      EVENT_VALUE: interaction.RATING,
      TIMESTAMP: interaction.TIMESTAMP
    }
  });

  const csvWriter = createCsvWriter({
    path: outputPath,
    header: [
      {id: 'USER_ID', title: 'USER_ID'},
      {id: 'ITEM_ID',   title: 'ITEM_ID'},
      {id: 'GENERES', title: 'GENERES'},
      {id: 'EVENT_TYPE', title: 'EVENT_TYPE'},
      {id: 'EVENT_VALUE', title: 'EVENT_VALUE'},
      {id: 'TIMESTAMP', title: 'TIMESTAMP'}
    ]
  });

  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));

}

createUserInteraction();