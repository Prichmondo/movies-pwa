const csv = require('csvtojson');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fetch = require('node-fetch');

const moviesPath = path.resolve(__dirname + '/ml-latest-small/movies.csv');
const linksPath = path.resolve(__dirname + '/ml-latest-small/links.csv');
const outputPath = path.resolve(__dirname + '/project-datasets/movies.csv');

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

function fixMoviesCSV() {

  console.log('Reading movies data from: ' + outputPath);
  csv()
    .fromFile(outputPath)
    .then((movies)=>{  
      updateMoviesCSV(movies);  
    });
  
}

const tmdbApikey = '29fa852c4aa3afb25276f463b7b19bb1';

async function getMovieDetails(movieid) {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/' + movieid + '?api_key=' + tmdbApikey)
    return await response.json();
  } catch (error) {
    return null;
  }
}

async function getMovieCredits(movieid) {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/' + movieid + '/credits?api_key=' + tmdbApikey)
    return await response.json();
  } catch (error) {
    return null;
  }
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
        const details = await getMovieDetails(link.tmdbId);
        const credits = await getMovieCredits(link.tmdbId);
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
          CAST: credits ? credits.cast.map(c => c.name).join('|') : ''
        });
      } catch (error) {
        console.log(error.message);
      }
      
    } else {
      data.push(movie);
    }
  }

  writeMovieCSV(data);

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
        const details = await getMovieDetails(movie.TMDB_ID);
        movie.YEAR = details ? details.release_date.split('-')[0] : '';
        movie.POSTER_PATH = details !== null ? details.poster_path : '';
        udpate = true;  
      } catch (error) {
        console.log(prefix, error.message);
      }
    }

    if(creditsMissing) {
      try {
        const credits = await getMovieCredits(movie.TMDB_ID);
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
    writeMovieCSV(data);
  }

}

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
      {id: 'CAST', title: 'CAST'}
    ]
  });

  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));
}

// createMoviesCSV();
fixMoviesCSV();