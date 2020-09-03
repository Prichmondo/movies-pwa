const fetch = require('node-fetch');

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

module.exports = {
  getMovieDetails, getMovieCredits
}